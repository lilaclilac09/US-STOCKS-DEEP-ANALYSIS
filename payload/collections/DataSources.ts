import { CollectionConfig } from 'payload/types';

const DataSources: CollectionConfig = {
  slug: 'data-sources',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['id', 'name', 'type', 'enabled', 'status'],
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Price & Fundamentals', value: 'price_and_fundamentals' },
        { label: 'Daily Prices', value: 'daily_prices' },
        { label: 'Market Data', value: 'market_data' },
      ],
      required: true,
    },
    {
      name: 'endpoint',
      type: 'text',
      required: true,
    },
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Planned', value: 'planned' },
        { label: 'Deprecated', value: 'deprecated' },
      ],
      defaultValue: 'planned',
    },
    {
      name: 'auth',
      type: 'select',
      options: [
        { label: 'API Key', value: 'apiKey' },
        { label: 'OAuth', value: 'oauth' },
        { label: 'None', value: 'none' },
      ],
      defaultValue: 'apiKey',
    },
    {
      name: 'apiKeyEnv',
      type: 'text',
      label: 'API Key Environment Variable',
    },
    {
      name: 'refreshCron',
      type: 'text',
      label: 'Refresh Schedule (cron)',
    },
    {
      name: 'mapping',
      type: 'json',
      admin: {
        description: 'Field mapping configuration for data refresh',
      },
    },
    {
      name: 'healthNotes',
      type: 'textarea',
    },
  ],
};

export default DataSources;
