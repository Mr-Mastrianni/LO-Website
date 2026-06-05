-- Insert initial community groups
INSERT INTO community_groups (id, name, description, privacy, member_count) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Brain Tumor Survivors', 'Connect with other brain tumor survivors and share your journey', 'public', 0),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Caregivers Support', 'Support group for caregivers of cancer patients', 'public', 0),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Newly Diagnosed', 'Support and guidance for newly diagnosed patients', 'public', 0),
  ('d4e5f6a7-b8c9-0123-def1-234567890123', 'Treatment Discussion', 'Discuss treatment options and experiences', 'public', 0),
  ('e5f6a7b8-c9d0-1234-ef12-345678901234', 'Wellness & Nutrition', 'Share wellness tips and nutrition advice', 'public', 0),
  ('f6a7b8c9-d0e1-2345-f123-456789012345', 'Clinical Trials', 'Information and discussion about clinical trials', 'public', 0),
  ('a7b8c9d0-e1f2-3456-1234-567890123456', 'Hope & Inspiration', 'Share stories of hope and inspiration', 'public', 0),
  ('b8c9d0e1-f2a3-4567-2345-678901234567', 'Research Updates', 'Latest research and medical advancements', 'public', 0)
ON CONFLICT (id) DO NOTHING;
