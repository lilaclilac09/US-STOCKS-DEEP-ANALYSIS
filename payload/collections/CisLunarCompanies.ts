import type { CollectionConfig } from 'payload';

const CisLunarCompanies: CollectionConfig = {
  slug: 'cislunar-companies',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'tier', 'tierName', 'segment', 'riskProfile'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'tier',
      type: 'select',
      options: [
        { label: '1 - Execution Anchors', value: '1' },
        { label: '2 - Contracted Implementers', value: '2' },
        { label: '3 - Disruptive Innovators', value: '3' },
      ],
      required: true,
    },
    {
      name: 'tierName',
      type: 'select',
      options: [
        { label: 'Execution Anchors', value: 'Execution Anchors' },
        { label: 'Contracted Implementers', value: 'Contracted Implementers' },
        { label: 'Disruptive Innovators', value: 'Disruptive Innovators' },
      ],
      required: true,
    },
    {
      name: 'riskProfile',
      type: 'text',
      required: true,
    },
    {
      name: 'trl',
      type: 'text',
      label: 'Technology Readiness Level',
      required: true,
    },
    {
      name: 'characteristics',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'segment',
      type: 'text',
      required: false,
    },
  ],
};

export default CisLunarCompanies;
