export default {
    name: 'featureProducts',
    title: 'Proizvodi na početnoj stranici',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{type: 'image'}],
            options: {
                hotspot : true,
            }
        },
    ]
}