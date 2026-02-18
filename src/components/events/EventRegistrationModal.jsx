import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Check, Loader2, CreditCard, ExternalLink } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import ZeffyEmbed from '@/components/donations/ZeffyEmbed';

const ZEFFY_DONATION_URL = 'https://www.zeffy.com/en-US/embed/donation-form/0750dbd9-2db9-41ea-890e-998e0da32bb6';

const EventRegistrationModal = ({ event, eventId, triggerAttributes, onRegistered }) => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [attendeeType, setAttendeeType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const [isSuccess, setIsSuccess] = useState(false);
    const [paymentStep, setPaymentStep] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const selectedTypeConfig = event.registrationTypes?.find(t => t.type === attendeeType);

    // Check if the current attendee type requires payment before registration
    const requiresPayment = attendeeType === 'sponsor' || attendeeType === 'vendor';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!attendeeType) {
            toast.error("Please select an attendee type.");
            return;
        }

        setIsLoading(true);

        try {
            // Separate core fields from extra data
            const { firstName, lastName, email, phone, ...extraData } = formData;

            const registrationStatus = requiresPayment ? 'pending_payment' : 'registered';

            const { data, error } = await supabase
                .from('event_registrations')
                .insert([{
                    event_id: String(eventId),
                    user_id: user?.id || null,
                    status: registrationStatus,
                    attendee_type: attendeeType,
                    first_name: firstName || null,
                    last_name: lastName || null,
                    email: email || null,
                    phone: phone || null,
                    registration_data: Object.keys(extraData).length > 0 ? extraData : {}
                }])
                .select()
                .single();

            if (error) throw error;

            if (requiresPayment) {
                // Show payment step instead of success
                setPaymentStep(true);
                toast.info("Please complete your payment to finalize registration.");
            } else {
                setIsSuccess(true);
                toast.success("Registration submitted successfully!");
            }

            // Notify parent component
            if (onRegistered) {
                onRegistered();
            }

            // Build rich context for email notification
            const typeConfig = event.registrationTypes?.find(t => t.type === attendeeType);
            const sponsorshipInfo = extraData.sponsorshipLevel
                ? event.sponsorshipLevels?.find(l => l.name === extraData.sponsorshipLevel)
                : null;

            // Send email notification (fire-and-forget)
            supabase.functions.invoke('send-registration-email', {
                body: {
                    eventTitle: event.title,
                    eventDate: event.date,
                    eventTime: event.time,
                    eventLocation: event.location,
                    attendeeType,
                    attendeeTypeLabel: typeConfig?.label || attendeeType,
                    registrationPrice: typeConfig?.price || 'N/A',
                    firstName: firstName || '',
                    lastName: lastName || '',
                    email: email || '',
                    phone: phone || '',
                    registrationData: extraData,
                    sponsorshipLevel: sponsorshipInfo?.name || null,
                    sponsorshipPrice: sponsorshipInfo?.price || null,
                    sponsorshipBenefits: sponsorshipInfo?.benefits || null,
                    registeredAt: new Date().toLocaleString('en-US', { timeZone: 'America/Phoenix' }),
                    paymentRequired: requiresPayment,
                    registrationStatus,
                }
            }).catch(err => console.error('Email notification failed:', err));
        } catch (error) {
            console.error('Error registering for event:', error);
            if (error.code === '23505') {
                toast.error('You are already registered for this event');
            } else {
                toast.error('Failed to register. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handlePaymentComplete = () => {
        setPaymentStep(false);
        setIsSuccess(true);
        toast.success("Thank you! Your registration will be confirmed once payment is verified.");
    };

    const renderFields = () => {
        if (!selectedTypeConfig) return null;

        return (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedTypeConfig.fields.includes('firstName') && (
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input id="firstName" name="firstName" required onChange={handleInputChange} />
                        </div>
                    )}
                    {selectedTypeConfig.fields.includes('lastName') && (
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name *</Label>
                            <Input id="lastName" name="lastName" required onChange={handleInputChange} />
                        </div>
                    )}
                </div>

                {selectedTypeConfig.fields.includes('email') && (
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input id="email" name="email" type="email" required onChange={handleInputChange} />
                    </div>
                )}

                {selectedTypeConfig.fields.includes('phone') && (
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Contact</Label>
                        <Input id="phone" name="phone" type="tel" onChange={handleInputChange} />
                    </div>
                )}

                {selectedTypeConfig.fields.includes('ticketCount') && (
                    <div className="space-y-2">
                        <Label htmlFor="ticketCount">Number of Tickets Needed *</Label>
                        <Input id="ticketCount" name="ticketCount" type="number" min="1" defaultValue="1" required onChange={handleInputChange} />
                    </div>
                )}

                {selectedTypeConfig.fields.includes('organization') && (
                    <div className="space-y-2">
                        <Label htmlFor="organization">Organizational Affiliation *</Label>
                        <Input id="organization" name="organization" required onChange={handleInputChange} />
                    </div>
                )}

                {selectedTypeConfig.fields.includes('institution') && (
                    <div className="space-y-2">
                        <Label htmlFor="institution">Institutional Affiliation *</Label>
                        <Input id="institution" name="institution" required onChange={handleInputChange} />
                    </div>
                )}

                {selectedTypeConfig.fields.includes('credentials') && (
                    <div className="space-y-2">
                        <Label htmlFor="credentials">Title/Credentials *</Label>
                        <Input id="credentials" name="credentials" placeholder="e.g. MD, PhD, RN" required onChange={handleInputChange} />
                    </div>
                )}

                {selectedTypeConfig.fields.includes('sponsorshipLevel') && (
                    <div className="space-y-2">
                        <Label htmlFor="sponsorshipLevel">Sponsorship Level *</Label>
                        <Select name="sponsorshipLevel" onValueChange={(val) => handleSelectChange('sponsorshipLevel', val)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a level" />
                            </SelectTrigger>
                            <SelectContent>
                                {event.sponsorshipLevels?.map((level) => (
                                    <SelectItem key={level.name} value={level.name}>
                                        {level.name} - {level.price}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {formData.sponsorshipLevel && (
                            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md mt-2">
                                <strong>Includes:</strong>
                                <ul className="list-disc list-inside mt-1">
                                    {event.sponsorshipLevels.find(l => l.name === formData.sponsorshipLevel)?.benefits.map((b, i) => (
                                        <li key={i}>{b}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                <div className="pt-2">
                    {selectedTypeConfig.price === 'Free' ? (
                        <div className="text-sm font-semibold text-green-600">
                            Registration is Free for Patients & Caregivers.
                        </div>
                    ) : selectedTypeConfig.price === 'Donation' ? (
                        <div className="text-sm font-semibold text-primary">
                            Registration is by voluntary donation. You will be contacted with donation instructions.
                        </div>
                    ) : selectedTypeConfig.price === 'Direct Link' ? (
                        <div className="text-sm font-semibold text-amber-700 bg-amber-50 p-3 rounded-md border border-amber-200">
                            <CreditCard className="inline w-4 h-4 mr-1 -mt-0.5" />
                            Payment is required to complete your sponsorship registration. You will be directed to our secure payment form after submitting your details.
                        </div>
                    ) : (
                        <div className="text-sm font-semibold text-amber-700 bg-amber-50 p-3 rounded-md border border-amber-200">
                            <CreditCard className="inline w-4 h-4 mr-1 -mt-0.5" />
                            Registration Fee: {selectedTypeConfig.price} — Payment is required to complete registration. You will be directed to our secure payment form next.
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={(val) => {
            setIsOpen(val);
            if (!val) setTimeout(() => { setIsSuccess(false); setPaymentStep(false); setAttendeeType(''); setFormData({}); }, 300);
        }}>
            <DialogTrigger asChild>
                {triggerAttributes ? (
                    <button {...triggerAttributes}>
                        Register Now
                    </button>
                ) : (
                    <Button variant="default">Register Now</Button>
                )}
            </DialogTrigger>
            <DialogContent className={`${paymentStep ? 'sm:max-w-[700px]' : 'sm:max-w-[600px]'} max-h-[90vh] overflow-y-auto`}>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-primary">
                        {paymentStep ? 'Complete Payment' : 'Event Registration'}
                    </DialogTitle>
                    <p className="text-gray-600 mt-1">
                        {event.title}
                    </p>
                </DialogHeader>

                {isSuccess ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-300">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <Check className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {requiresPayment ? 'Registration Pending Payment Verification' : 'Registration Received!'}
                        </h3>
                        <p className="text-gray-600 max-w-sm mx-auto">
                            {requiresPayment
                                ? 'Thank you! Your registration will be confirmed once your payment has been verified by our team. You will receive a confirmation email shortly.'
                                : 'Thank you for registering. We have received your details and will send a confirmation email shortly.'
                            }
                        </p>
                        <Button className="mt-6" onClick={() => setIsOpen(false)}>
                            Close
                        </Button>
                    </div>
                ) : paymentStep ? (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                            <h3 className="font-semibold text-amber-800 mb-1">
                                <CreditCard className="inline w-4 h-4 mr-1 -mt-0.5" />
                                Payment Required
                            </h3>
                            <p className="text-sm text-amber-700">
                                Your registration details have been saved. Please complete your payment below to finalize your {attendeeType === 'sponsor' ? 'sponsorship' : 'registration'}.
                                {formData.sponsorshipLevel && (
                                    <span className="font-semibold block mt-1">
                                        Sponsorship Level: {formData.sponsorshipLevel} — {event.sponsorshipLevels?.find(l => l.name === formData.sponsorshipLevel)?.price}
                                    </span>
                                )}
                                {selectedTypeConfig?.price && selectedTypeConfig.price !== 'Direct Link' && selectedTypeConfig.price !== 'Free' && selectedTypeConfig.price !== 'Donation' && (
                                    <span className="font-semibold block mt-1">
                                        Amount Due: {selectedTypeConfig.price}
                                    </span>
                                )}
                            </p>
                        </div>

                        <div className="rounded-lg overflow-hidden border border-gray-200">
                            <ZeffyEmbed src={ZEFFY_DONATION_URL} />
                        </div>

                        <div className="flex justify-between items-center pt-2">
                            <a
                                href="https://www.zeffy.com/en-US/donation-form/0750dbd9-2db9-41ea-890e-998e0da32bb6"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                            >
                                <ExternalLink className="w-3 h-3" />
                                Open in new window
                            </a>
                            <Button onClick={handlePaymentComplete}>
                                I've Completed My Payment
                            </Button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                        <div className="space-y-2">
                            <Label htmlFor="attendeeType">I am registering as a...</Label>
                            <Select onValueChange={setAttendeeType} value={attendeeType}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select your role" />
                                </SelectTrigger>
                                <SelectContent>
                                    {event.registrationTypes?.map((type) => (
                                        <SelectItem key={type.type} value={type.type}>
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {renderFields()}

                        {attendeeType && (
                            <div className="pt-4 flex justify-end gap-3">
                                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Processing...
                                        </>
                                    ) : requiresPayment ? (
                                        <>
                                            <CreditCard className="mr-2 h-4 w-4" />
                                            Proceed to Payment
                                        </>
                                    ) : (
                                        'Submit Registration'
                                    )}
                                </Button>
                            </div>
                        )}
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default EventRegistrationModal;

