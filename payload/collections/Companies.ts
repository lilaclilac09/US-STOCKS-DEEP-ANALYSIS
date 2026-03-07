import type { CollectionConfig } from 'payload';

const Companies: CollectionConfig = {
  slug: 'companies',
  admin: {
    useAsTitle: 'symbol',
    defaultColumns: ['symbol', 'fullName', 'sector', 'currentPrice', 'status'],
  },
  fields: [
    {
      name: 'symbol',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'sector',
      type: 'text',
      required: true,
    },
    {
      name: 'mainBusiness',
      type: 'textarea',
      required: false,
    },
    {
      name: 'financials',
      type: 'group',
      fields: [
        { name: 'revenue', type: 'text' },
        { name: 'netProfit', type: 'text' },
        { name: 'cashFlow', type: 'text' },
        { name: 'period', type: 'text' },
      ],
    },
    {
      name: 'indicators',
      type: 'group',
      fields: [
        { name: 'roic', type: 'text' },
        { name: 'roe', type: 'text' },
        { name: 'cashFlow', type: 'text' },
        { name: 'debt', type: 'text' },
        { name: 'currentRatio', type: 'text' },
        { name: 'occupancy', type: 'text' },
        { name: 'leverageNote', type: 'text' },
        { name: 'margin', type: 'text' },
        { name: 'buildup', type: 'text' },
        { name: 'pipeline', type: 'text' },
        { name: 'buyback', type: 'text' },
      ],
    },
    {
      name: 'latestDevelopments',
      type: 'array',
      fields: [
        { name: 'development', type: 'text', required: true },
      ],
    },
    {
      name: 'currentPrice',
      type: 'text',
      required: true,
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        { name: 'tag', type: 'text', required: true },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
      defaultValue: 'active',
    },
    {
      name: 'lastRefreshedAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'lastPriceSource',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
  ],
};

export default Companies;
