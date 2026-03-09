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
import { Check, Loader2, CreditCard, ExternalLink, AlertTriangle } from 'lucide-react';
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
    const [donationConfirmed, setDonationConfirmed] = useState(false);

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
    // Sponsor, Vendor, and Physician/APP/Provider require donation/payment
    const requiresPayment = attendeeType === 'sponsor' || attendeeType === 'vendor' || attendeeType === 'physician' || attendeeType === 'researcher';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!attendeeType) {
            toast.error("Please select an attendee type.");
            return;
        }

        if (requiresPayment && !donationConfirmed) {
            toast.error("Please complete your donation and check the confirmation box before submitting.");
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

            setIsSuccess(true);

            if (requiresPayment) {
                toast.success("Registration submitted! Your spot will be confirmed once payment is verified.");
            } else {
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

                {/* Price Info Banner */}
                <div className="pt-2">
                    {selectedTypeConfig.price === 'Free' ? (
                        <div className="text-sm font-semibold text-green-600">
                            Registration is Free for Patients & Caregivers.
                        </div>
                    ) : selectedTypeConfig.price === 'Donation' ? (
                        <div className="text-sm font-semibold text-amber-700 bg-amber-50 p-3 rounded-md border border-amber-200">
                            <CreditCard className="inline w-4 h-4 mr-1 -mt-0.5" />
                            Registration requires a donation. Please complete the donation form below before submitting.
                        </div>
                    ) : selectedTypeConfig.price === 'Direct Link' ? (
                        <div className="text-sm font-semibold text-amber-700 bg-amber-50 p-3 rounded-md border border-amber-200">
                            <CreditCard className="inline w-4 h-4 mr-1 -mt-0.5" />
                            Payment is required to complete your sponsorship. Please complete the payment form below before submitting.
                        </div>
                    ) : (
                        <div className="text-sm font-semibold text-amber-700 bg-amber-50 p-3 rounded-md border border-amber-200">
                            <CreditCard className="inline w-4 h-4 mr-1 -mt-0.5" />
                            Registration Fee: {selectedTypeConfig.price} — Please complete payment below before submitting.
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Render the inline Zeffy donation form for payment-required attendee types
    const renderInlinePayment = () => {
        if (!requiresPayment || !attendeeType) return null;

        return (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                {/* Divider */}
                <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-white px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                            Step 1: Complete Payment
                        </span>
                    </div>
                </div>

                {/* Payment Amount Context */}
                <div className="border rounded-lg p-4 bg-amber-50 border-amber-200">
                    <h3 className="font-semibold mb-2 flex items-center text-amber-800">
                        <CreditCard className="w-5 h-5 mr-2" />
                        {attendeeType === 'sponsor' ? 'Sponsorship Payment' :
                            attendeeType === 'vendor' ? 'Registration Fee Payment' :
                                'Registration Donation'}
                    </h3>

                    {/* Sponsor: show selected level price */}
                    {attendeeType === 'sponsor' && formData.sponsorshipLevel && (
                        <div className="mb-2">
                            <p className="text-2xl font-bold text-amber-800">
                                {event.sponsorshipLevels?.find(l => l.name === formData.sponsorshipLevel)?.price}
                            </p>
                            <p className="text-sm text-amber-600">
                                Unless otherwise negotiated, please enter this exact amount in the donation form below
                            </p>
                        </div>
                    )}
                    {attendeeType === 'sponsor' && !formData.sponsorshipLevel && (
                        <p className="text-sm text-amber-600">
                            Please select a sponsorship level above first
                        </p>
                    )}

                    {/* Vendor: show fixed price */}
                    {attendeeType === 'vendor' && selectedTypeConfig?.price && (
                        <div className="mb-2">
                            <p className="text-2xl font-bold text-amber-800">
                                {selectedTypeConfig.price}
                            </p>
                            <p className="text-sm text-amber-600">
                                Unless otherwise negotiated, please enter this exact amount in the donation form below
                            </p>
                        </div>
                    )}

                    {/* Physician: show suggested donation */}
                    {(attendeeType === 'physician' || attendeeType === 'researcher') && (
                        <div className="mb-2">
                            <p className="text-sm text-amber-600">
                                Physicians and researchers register through a donation of their choosing. Please enter your preferred amount in the form below.
                            </p>
                        </div>
                    )}
                </div>

                {/* Embedded Zeffy Form — always visible */}
                <div className="rounded-lg overflow-hidden border border-gray-200">
                    <div className="bg-gray-100 px-4 py-2 text-sm text-gray-600 font-medium border-b flex items-center justify-between">
                        <span>Secure Payment via Zeffy</span>
                        <a
                            href="https://www.zeffy.com/en-US/donation-form/0750dbd9-2db9-41ea-890e-998e0da32bb6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                        >
                            <ExternalLink className="w-3 h-3" />
                            Open in new window
                        </a>
                    </div>
                    <ZeffyEmbed
                        src={ZEFFY_DONATION_URL}
                        height={500}
                    />
                </div>

                {/* Manual Confirmation Checkbox */}
                <div className={`border-2 rounded-lg p-4 transition-colors ${donationConfirmed
                    ? 'bg-green-50 border-green-300'
                    : 'bg-gray-50 border-gray-200'
                    }`}>
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={donationConfirmed}
                            onChange={(e) => setDonationConfirmed(e.target.checked)}
                            className="mt-1 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer accent-green-600"
                        />
                        <div>
                            <p className={`font-semibold ${donationConfirmed ? 'text-green-800' : 'text-gray-800'}`}>
                                I have completed my payment through the Zeffy form above
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                Your registration will be held as pending until payment is verified by our team.
                            </p>
                        </div>
                    </label>
                </div>

                {/* Warning note */}
                <div className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md p-3">
                    <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>
                        <strong>Important:</strong> Your registration will remain pending until our team confirms your payment in the Zeffy dashboard.
                        Please use the <strong>same name and email</strong> in the Zeffy form as you entered above so we can match your payment.
                    </p>
                </div>
            </div>
        );
    };

    // Render optional donation form for patients/caregivers
    const renderOptionalDonation = () => {
        if (requiresPayment || attendeeType !== 'patient') return null;

        return (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                {/* Divider */}
                <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-white px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                            Optional Donation
                        </span>
                    </div>
                </div>

                <div className="border rounded-lg p-4 bg-green-50 border-green-200">
                    <p className="text-sm font-semibold text-green-800">
                        💚 Caregivers and patients attend at no cost. However, you are free to donate below.
                    </p>
                </div>

                {/* Embedded Zeffy Form */}
                <div className="rounded-lg overflow-hidden border border-gray-200">
                    <div className="bg-gray-100 px-4 py-2 text-sm text-gray-600 font-medium border-b flex items-center justify-between">
                        <span>Secure Donation via Zeffy</span>
                        <a
                            href="https://www.zeffy.com/en-US/donation-form/0750dbd9-2db9-41ea-890e-998e0da32bb6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                        >
                            <ExternalLink className="w-3 h-3" />
                            Open in new window
                        </a>
                    </div>
                    <ZeffyEmbed
                        src={ZEFFY_DONATION_URL}
                        height={500}
                    />
                </div>
            </div>
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={(val) => {
            setIsOpen(val);
            if (!val) setTimeout(() => { setIsSuccess(false); setAttendeeType(''); setFormData({}); setDonationConfirmed(false); }, 300);
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
            <DialogContent className={`${requiresPayment && attendeeType ? 'sm:max-w-[800px]' : 'sm:max-w-[600px]'} max-h-[90vh] overflow-y-auto`}>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-primary">
                        Event Registration
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
                            {requiresPayment ? 'Registration Pending — Payment Verification Required' : 'Registration Received!'}
                        </h3>
                        <p className="text-gray-600 max-w-sm mx-auto">
                            {requiresPayment
                                ? 'Thank you! Your registration has been submitted and will be confirmed once our team verifies your payment in the Zeffy dashboard. You will receive a confirmation email once verified.'
                                : 'Thank you for registering. We have received your details and will send a confirmation email shortly.'
                            }
                        </p>
                        <Button className="mt-6" onClick={() => setIsOpen(false)}>
                            Close
                        </Button>
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

                        {/* Inline Zeffy Donation Form for payment-required types */}
                        {renderInlinePayment()}

                        {/* Optional donation form for patients/caregivers */}
                        {renderOptionalDonation()}

                        {attendeeType && (
                            <div className="pt-4 space-y-3">
                                <div className="flex justify-end gap-3">
                                    <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isLoading || (requiresPayment && !donationConfirmed)}
                                        className={requiresPayment && !donationConfirmed ? 'opacity-50 cursor-not-allowed' : ''}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Processing...
                                            </>
                                        ) : requiresPayment ? (
                                            <>
                                                <Check className="mr-2 h-4 w-4" />
                                                Submit Registration
                                            </>
                                        ) : (
                                            'Submit Registration'
                                        )}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default EventRegistrationModal;
