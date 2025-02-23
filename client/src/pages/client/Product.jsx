import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import ProductCard from "../../components/Product"
import { useCart } from "../../context/CartContext";
import { getProduct, getProducts } from "../../controllers/productController";
import { showErrorAlert } from '../../assets/ErrorHandler';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GiveReview from "../../components/GiveReview";
import ProductReview from "../../components/ProductReview";
import ProductPageSkeleton from "../../components/ProductPageSkeleton";

const Product = () => {
  const { id } = useParams()
  const { dispatch } = useCart()

  const [product, setProduct] = useState({})
  const [img, setImg] = useState("")
  const [vd, setVd] = useState("")


  const [related, setRelated] = useState([])


  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  document.title = `${product.name ? product.name : ""}`


  const addToCart = () => {
    if (!size || !color) {
      return showErrorAlert("الرجاء تحديد الحجم واللون")
    }
    let price
    product.salePrice ? price = product.salePrice : price = product.basePrice
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        freeShipping: product.freeShipping,
        name: product.name,
        image: product.images[0],
        price,
        size, quantity: 1, id: product.id, color
      }
    });
  };

  const handleBuyNow = () => {
    let price
    product.salePrice ? price = product.salePrice : price = product.basePrice
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        freeShipping: product.freeShipping,
        name: product.name,
        image: product.images[0],
        price,
         quantity: 1, id: product.id
      }
    });
    navigate('/checkout')
  }

  useEffect(() => {
    const getData = async () => {
      const res = await getProduct(id)
      const res1 = await getProducts({
        category: res.category && res.category, subCategory: "",
        page: 1, limit: 5, title: "", bestSeller: "", lth: false, rlvnt: true, htl: false
      })
      setProduct(res)
      setImg(res.images[0])
      setRelated(res1.products)
      setLoading(false)
    }
    getData()
  }, [id])


  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 ">
      <ToastContainer />
      {loading ? <ProductPageSkeleton /> : <>{product ? <>
        <div className="flex items-start gap-12 sm:gap-6 flex-col sm:flex-row">
          <div className="flex-1 flex flex-col-reverse md:flex-row gap-2 p-2">
            <div className="grid grid-cols-6 md:flex md:flex-col gap-2 md:w-[10%]">
              {product.images && product.images.filter(item => item !== null).map(i => (
                <div className="w-full flexCenter overflow-hidden aspect-square rounded-sm border-[0.5px]" key={i}>
                  <img src={i} className="rounded-sm w-auto md:w-full sm:mb-3  cursor-pointer hover:scale-110 duration-100" alt="product"
                    onClick={() => { setVd(null); setImg(i) }} />
                </div>
              ))}
              {product.videos && product.videos.filter(item => item !== null).map(i => (
                <div onClick={() => { console.log(i); setVd(i); console.log(vd); }}
                  className="w-full overflow-hidden aspect-square rounded-sm border-[0.5px] flexCenter" key={i}>
                  <video
                    className=" rounded-sm w-auto md:w-full sm:mb-3  cursor-pointer hover:scale-110 duration-100"
                    src={i}
                  />
                </div>
              ))}
            </div>
            <div className="w-full md:w-[88%] overflow-hidden aspect-square rounded-md border-[1px] flexCenter">
              {vd ? <video
                className=" rounded-sm w-auto md:w-full sm:mb-3  cursor-pointer duration-100"
                src={vd}
                autoPlay
                controls
              /> :
                <img src={img && img} alt="product" className="rounded-md" />
              }
            </div>
          </div>
          <div className="flex-1 w-full">
            <p className="text-center sm:text-left text-sm  text-gray-600 font-light mb-2">Home / {product && product.category} / {product && product.subCategory}</p>
            <h1 className="font-medium text-2xl text-center sm:text-left ">{product && product.name}</h1>
            <ProductReview props={{ id }} />
            <div className=" text-3xl font-medium mt-2 flex justify-center sm:justify-start">DA
              {product && product.salePrice ?
                <div className="flex gap-2">{product.salePrice}<p className='line-through text-gray-500 font-normal'>DA{product.basePrice}</p>
                </div> : <>{product.basePrice}</>}
            </div>
            <p className="mt-5 text-gray-500 md:w-4/5 text-center sm:text-right font-['Cairo']">
              {product && product.description}
            </p>
            <div className="flexCenter flex-col sm:flex-row sm:justify-start gap-2 font-['Cairo'] mt-24">
              <button className="bg-black text-white w-full sm:w-auto px-8 py-3 text-sm active:bg-gray-700"
                onClick={handleBuyNow}>اطلب الآن</button>

              <button className="border-gray-900 border-[1px] w-full sm:w-auto font-medium px-8 py-3 text-sm active:bg-gray-700"
                onClick={addToCart}>أضف إلى السلة</button>
            </div>

            <hr className="mt-8 sm:w-4/5"></hr>
            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1 text-right font-['Cairo']">
              <p>منتج ذو جودة عالية .</p>
            </div>

          </div>
        </div>
      </> : <div className="opacity-0"></div>}</>
      }
      <GiveReview props={{ id }} />

      <div className="my-10 font-['Cairo']">
        <div className="text-center py-8 text-3xl">
          <div className="inline-flex flex-row-reverse gap-2 items-center mb-3">
            <p className="text-gray-500">المنتجات<span className="text-gray-700 font-medium"> ذات الصلة </span></p>
            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
          </div>
          <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            قد تعجبك أيضًا هذه الأنماط المختارة بعناية، والتي تتناسب تمامًا مع كل إطلالة.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 font-sans">
          {related && related.map(p => (<ProductCard props={p} key={p.id} />))}
        </div>
      </div>
    </div>

  )
}

export default Product