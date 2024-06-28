import Footer from "../Components/Footer/Footer"
import Header from "../Components/Header/Header"
import {Routes,Route} from 'react-router-dom'
import Allproducts from "../Components/Products/Allproducts"
import CreateProduct from "../Components/Products/CreateProduct"
import CreateBanner from "../Components/Banner/CreateBanner"
import AllBanner from "../Components/Banner/AllBanner"
import FrontPage from "../Components/Front-page/Front-Page"
import Orders from "../Components/orders/Orders"
import AllCategories from "../Components/Products/AllCategories"
import Shipped from "../Components/orders/Shipped"
import ContactRequest from "../Components/Contact/ContactRequest"
import EditProduct from "../Components/Products/EditProduct"
import ImageUpload from "../Components/Upload/ImageUpload"
import Allimages from "../Components/Products/Allimages"
import OrderDetails from "../Components/orders/OrderDetails"
import User from "../Components/Users/User"
import Contacts from "../Components/Users/Contacts"
import Logins from "../Components/Users/Login"
import EditPoject from "../Components/Products/EditP"
import CreateCategoryForm from "../Components/Products/CreateCategoryForm"
import AllTags from "../Components/Products/AllTags"
import CreateTags from "../Components/Products/CreateTags"
import ShipLogin from "../Components/ShipLogin/ShipLogin"
import CreateOfferBanner from "../Components/SalesBanner/CreateofferBaner"
import SalesBanner from "../Components/SalesBanner/SalesBanner"
import AllVouchers from "../Components/Vouchers/AllVouchers"
import CreateVoucher from "../Components/Vouchers/CreateVoucher"
import AllCategoreybanner from "../Components/CategoryBanner/AllCategoreybanner"
import CreateCategoryFormBanner from "../Components/CategoryBanner/CategoreyBanner"
const Home = () => {
  return (
    <div className="w-full flex">
        <div className="  z-10 w-[18%]  ">
            <Header/>
        </div>
        <div className="w-[85%] overflow-hidden relative  z-99 bg-white ">
           <Routes>
            <Route path="/home" element={<FrontPage/>} />
            <Route path="/All Products" element={<Allproducts/>} />
            <Route path="/EditProducts/:name/:id" element={<EditPoject/>} />

            
            <Route path="/Create-Products" element={<CreateProduct/>} />
            <Route path="/Create-Banner" element={<CreateBanner/>} />
            <Route path="/Show Banner" element={<AllBanner/>} />
            <Route path="/Orders" element={<Orders/>} />
            <Route path="/Order-details/:id" element={<OrderDetails/>} />

            <Route path="/upload" element={<ImageUpload/>} />
            <Route path="/Check-All-Images" element={<Allimages/>} />
            <Route path="/Contacts" element={<Contacts/>} />
            <Route path="/Login" element={<Logins/>} />
            <Route path="/Create-Categories" element={<CreateCategoryForm/>} />

            <Route path="/tags" element={<AllTags/>} />
            <Route path="/Create-tags" element={<CreateTags/>} />




            <Route path="/Categories" element={<AllCategories/>} />
            <Route path="/All-user" element={<User/>} />
            <Route path="/Contact-Request" element={<ContactRequest/>} />

            <Route path="/Ship-login" element={<ShipLogin />} />
            <Route path="/Change-Order-Status/:id" element={<Shipped />} />


            <Route path="/Category-Banners" element={<AllCategoreybanner />} />
            <Route path="/Create-Category-Banners" element={<CreateCategoryFormBanner />} />
            <Route path="/Our-Vouchers" element={<AllVouchers />} />
            <Route path="/Create-Vouchers" element={<CreateVoucher />} />
            <Route path="/Create-Offer-Banner" element={<CreateOfferBanner />} />
        
            <Route path="/offer-Banner" element={<SalesBanner />} />
            





            </Routes>
        </div>
    </div>
  )
}

export default Home