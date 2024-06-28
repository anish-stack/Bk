import React from 'react'
import CustomSlider from '../../components/Slider/Slider'
import EssintalCollection from '../../components/Collections/Essintaial collection/EssintalCollection'
import NewArrival from '../../components/Collections/New Arrival/NewArrival'
import CollectionWithBanner from '../../components/Collections/CollectionWithBanner/CollectionWithBanner'
import WeeksHighlight from '../../components/Collections/WeekHighlight/WeeksHighlight'
import QualityFooter from '../../components/Others/QualityFooter'
import Shirt from '../../components/Collections/New Arrival/Shirt'

const Home = () => {
  return (
    <div>
        <CustomSlider/>
        <EssintalCollection/>
        <NewArrival/>
        <CollectionWithBanner/>
        <WeeksHighlight/>
        <Shirt/>
        <QualityFooter/>
    </div>
  )
}

export default Home