import React, { useContext } from 'react'
import Layout from "../../components/layout/Layout"
import HeroSection from '../../components/herosection/HeroSection'
import Category from '../../components/category/Category'
import HomePageProductCard from '../../components/homepageproductcard/HomePageProductCard'
import Track from '../../components/Track/Track'
import Testimoinal from '../../components/testimoinal/Testimoinal'
import Loader from '../../components/loader/Loader'
// import MyContext from '../../context/MyContext'

const HomePage = () => {
  // const context = useContext(MyContext);
  // const name = context;
  return (
    <Layout>
      <HeroSection></HeroSection>
      <Category></Category>
      <HomePageProductCard></HomePageProductCard>
      <Track></Track>
      <Testimoinal></Testimoinal>
     <Loader></Loader>
    </Layout>
  )
}

export default HomePage
