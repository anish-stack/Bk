import React from 'react'

const QualityFooter = () => {

    const data = [
        {
            id: 1,
            head: "Fast Delivery",
            para: "Free shipping on all orders",
            icons: 'ri-truck-line'
        },
        {
            id: 2,
            head: "Safe Payment",
            para: "We ensure secure payment",
            icons: 'ri-shield-line'

        },
        {
            id: 3,
            head: "24/7 Online Support",
            para: "24 hours a day, 7 days a week ",
            icons: "ri-question-line"
        },
        {
            id: 4,
            head: "Free Returns",
            para: "Simply return it within 30 days",
            icons: 'ri-exchange-funds-line'
        },

    ]
    return (
        <div className='max-w-7xl mt-5 mx-auto text-center py-2'>
            <div className='grid sm:md-grid-cols-2 mr-auto mx-auto grid-cols-1 gap-2 md:grid-cols-4 '>
                {data.map((item, index) => (
                    <div key={index} className='w-full px-3 py-5'>
                        <div className='px-3 py-5'>
                            <i className={` md:text-3xl text-lg font-bold  ${item.icons}`}></i>
                        </div>
                        <div>
                            <h2 className='text-xl font-bold'>{item.head}</h2>
                            <p className='text-lg font-normal'>{item.para}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QualityFooter