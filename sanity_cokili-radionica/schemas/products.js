
export default {
    name: 'subProduct',
    title: 'Proizvodi',
    type: 'document',
    fields: [
        {
            name: 'subImage',
            title: 'Slika podele proizvoda',
            type: 'array',
            of: [{type: 'image'}],
            options: {
                hotspot : true,
            }
        },
        {
            name: 'subName',
            title: 'Ime podele proizvoda',
            type: 'string'
        },
        {
            name:'subSlug',
            title: 'zavrsetak linka',
            type: 'slug',
            isUnique: true,
            options: {
                source: 'name',
                maxLength: 90,
            }
        },
        {
            name: 'products',
            title: 'Proizvodi',
            type: 'array',
            of: [{
                name: 'product',
                title: 'Proizvodi',
                type: 'document',   
                fields: [
                    {    
                        name: 'image',
                        title: 'Slika proizvoda',
                        type: 'array',
                        of: [{type: 'image'}],
                        options: {
                            hotspot : true, 
                        }
                    },
                    {
                        name: 'imageUrl',
                        title: 'Slika proizvoda',
                        type: 'array',
                        of: [{type: 'url'}],
                    },
                    {
                        name: 'name',
                        title: 'Ime proizvoda',
                        type: 'string'
                    },
                    {
                        name:'slug',
                        title: 'Zavrsetak linka za proizvod',
                        type: 'slug',
                        isUnique: true,
                        options: {
                            source: 'name',
                            maxLength: 90,
                          
                        }
                    },
                    {
                        name: 'price',
                        title: 'Cena',
                        type: 'number'
                    },
                    {
                        name: 'details',
                        title: 'Opis',
                        type: 'string',
                    },
                  
                ]
             }
            ]
        
        }
    ],
    

}