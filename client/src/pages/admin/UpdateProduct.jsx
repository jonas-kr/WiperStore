import { useState, useEffect } from "react"
import { assets, categories, subCategories } from "../../assets/admin_assets/assets"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from 'uuid'
import { storage } from "../../firebase"
import { updateProduct, getProduct } from "../../controllers/productController"

import { showErrorAlert } from '../../assets/ErrorHandler';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from "react-router-dom"


const UpdateProduct = () => {
    const { id } = useParams()

    const [product, setProduct] = useState(null)

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState(categories[0])
    const [subCategory, setSubCategory] = useState(subCategories[0])
    const [basePrice, setBasePrice] = useState("")
    const [salePrice, setSalePrice] = useState("")
    const [bestSeller, setBestseller] = useState(false)
    const [freeShipping, setFreeShipping] = useState(false)

    const [images, setImages] = useState([null, null, null, null, null, null, null, null])
    const [videos, setVideos] = useState([null, null, null])


    const navigate = useNavigate()

    useEffect(() => {
        const getData = async () => {
            const res = await getProduct(id)
            setProduct(res)
            setName(res.name)
            setDescription(res.description)
            setCategory(res.category)
            setSubCategory(res.subCategory)
            setBasePrice(res.basePrice)
            setSalePrice(res.salePrice)
            setBestseller(res.bestSeller)
            setFreeShipping(res.freeShipping)
            setImages(res.images)
            setVideos(res.videos)
        }
        getData()
    }, [id])

    
    const uploadVideo = async (video, index) => {
        if (!video) return alert("No video has been selected");

        // Check if the selected file is a video
        if (!video.type.startsWith("video/")) {
            return alert("The selected file is not a video");
        }

        const videoRef = ref(storage, `ecommerce/${video.name + v4()}`);
        console.log(videoRef);

        // Upload video to Firebase Storage
        uploadBytes(videoRef, video).then((snapshot) => {
            // Get the download URL after successful upload
            getDownloadURL(snapshot.ref).then((url) => {
                const updatedVideos = [...videos];
                updatedVideos[index] = url; // Update the state or array with the video URL
                setVideos(updatedVideos);
            });
        }).catch((error) => {
            console.error("Error uploading video:", error);
            alert("Failed to upload video. Please try again.");
        });
    };

    const uploadImage = async (img, index) => {
        if (!img) return alert("No image has been selected")
        const imgRef = ref(storage, `ecommerce/${img.name + v4()}`)
        uploadBytes(imgRef, img).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                const updatedImages = [...images]
                updatedImages[index] = url
                setImages(updatedImages)
            })
        })
    }


    const handleUpdateProduct = async (e) => {
        e.preventDefault()
        try {

            const res = await updateProduct(name, description, images, videos, basePrice, salePrice,
                category, subCategory, bestSeller, freeShipping, product._id)
            navigate('/admin/list')
        } catch (error) {
            showErrorAlert(error.message)
        }
    }
    if (!product) return <div className="opacity-0"></div>
    return (
        <form className="flex flex-col w-full items-start gap-3">
            <ToastContainer />
            <div>
                <p className="mb-2">Upload Image</p>
                <div className="flex gap-2">
                    {images.map((img, index) => (
                        <div className="flex gap-2">
                            <label for={`image${index}`} className="flexCenter aspect-square overflow-hidden">
                                <img className="w-20" src={img ? img : assets.upload_area} alt="upload" />
                                <input type="file" id={`image${index}`} hidden onChange={(e) => { uploadImage(e.target.files[0], index) }} />
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <p className="mb-2">Upload Video</p>
                <div className="flex gap-2">
                    {videos.map((vd, index) => (
                        <div className="flex gap-2" key={index}>
                            <label for={`video${index}`} className="flexCenter aspect-square overflow-hidden">
                                {vd ? <video
                                    className="w-20"
                                    src={vd ? vd : assets.upload_area}
                                    controls
                                /> :
                                    <img className="w-20" src={assets.upload_area} alt="upload" />

                                }
                                <input type="file" id={`video${index}`} hidden onChange={(e) => { uploadVideo(e.target.files[0], index) }} />
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full">
                <p className="mb-2">Product name</p>
                <input className="w-full max-w-[500px] px-3 py-2 text-left" type="text" placeholder="Type here" required
                    value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="w-full">
                <p className="mb-2">Product description</p>
                <textarea className="w-full max-w-[500px] px-3 py-2 text-left font-['Cairo']" type="text" placeholder="Write content here"
                    value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
                <div>
                    <p className="mb-2">Product category</p>
                    <select className="w-full px-3 py-2"
                        value={category} onChange={(e) => setCategory(e.target.value)}>
                        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div>
                    <p className="mb-2">Sub category</p>
                    <select className="w-full px-3 py-2"
                        value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
                        {subCategories.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div>
                    <p className="mb-2">Product Base Price</p>
                    <input className="w-full px-3 py-2 sm:w-[120px] text-left" type="Number" placeholder="25"
                        value={basePrice} onChange={(e) => setBasePrice(e.target.value)} />
                </div>
                <div>
                    <p className="mb-2">Product Sale Price</p>
                    <input className="w-full px-3 py-2 sm:w-[120px] text-left" type="Number" placeholder="25"
                        value={salePrice} onChange={(e) => setSalePrice(e.target.value)} />
                </div>
            </div>



            <div className="flex gap-2 mt-2">
                <input type="checkbox" id="bestseller" checked={bestSeller && "checked"}
                    onChange={(e) => setBestseller(e.target.checked)} />
                <label className="cursor-pointer" for="bestseller">Add to bestseller</label>
            </div>
            <div className="flex gap-2 mt-2">
                <input type="checkbox" id="freeShipping" checked={freeShipping && "checked"}
                    onChange={(e) => setFreeShipping(e.target.checked)} />
                <label className="cursor-pointer" for="freeShipping">Free Shipping</label>
            </div>
            <button type="submit" className="w-28 py-3 mt-4 bg-black text-white"
                onClick={handleUpdateProduct}>UPDATE</button>
        </form>
    )
}

export default UpdateProduct