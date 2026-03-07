import { CollectionConfig } from 'payload/types';

const Indexes: CollectionConfig = {
  slug: 'indexes',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['id', 'name', 'provider', 'status'],
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
      name: 'provider',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Tracked', value: 'tracked' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'tracked',
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
};

export default Indexes;
