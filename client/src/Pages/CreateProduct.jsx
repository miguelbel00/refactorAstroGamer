import '../styles/createproduct.css';
import Styles from "../styles/createproduct.module.css";
import { useEffect, useState } from 'react';
import { postProduct } from '../redux/actions/actionsPetitions';
import { getAllProducts } from '../redux/actions/actionsFilter';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getCategory } from '../redux/actions/actionsAdmin';
import Swal from 'sweetalert2';
import dino from '../assets/dino.png';

const CreateProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const categoriesState = useSelector(state => state.reducerAdmin.categories);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    image: [],
    price: "",
    stock: "",
    categories: []
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const errorAlert = (message) => {
    Swal.fire({
      title: 'Error!',
      text: `${message}`,
      confirmButtonText: 'Try Again',
      background: '#fff',
      icon: 'error',
      customClass: {
        popup: 'popup-alert',
        text: 'titleAlert',
        content: 'titleAlert'
      },
    });
  };

  const successAlert = () => {
    Swal.fire({
      title: 'Success!',
      text: `Product Created successfully`,
      confirmButtonText: 'Lets Go',
      background: '#fff',
      customClass: {
        popup: 'popup-alert',
        text: 'titleAlert',
        content: 'titleAlert'
      },
      imageUrl: dino,
      imageWidth: '200px',
      imageHeight: '200px'
    });
  };

  const validate = (product) => {
    let error = {};

    if (product.name.length === 0) {
      error.name = 'Please enter a valid title.';
    }
    if (product.price.length === 0) {
      error.price = 'Please enter the price of the product.';
    }
    if (product.image.length === 0) {
      error.image = 'Please enter the URL of the image.';
    }
    if (!product.stock) {
      error.stock = 'Please enter the stock of the product.';
    }
    if (!product.description) {
      error.description = 'Please enter the description of the product.';
    }

    return error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors(validate(product));

    if (Object.keys(errors).length === 0) {
      await dispatch(postProduct(product));
      await dispatch(getAllProducts());
      successAlert();
      history.push('/admin');
    } else {
      errorAlert('Please fill all fields correctly.');
    }
  };

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCategory = (e) => {
    const category = e.target.value;
    if (!product.categories.includes(category)) {
      setProduct({
        ...product,
        categories: [...product.categories, category]
      });
    }
  };

  const handleImage = (e) => {
    const image = e.target.value;
    if (image && !product.image.includes(image)) {
      setProduct({
        ...product,
        image: [...product.image, image]
      });
    }
  };

  const handleDelete = (category) => {
    setProduct({
      ...product,
      categories: product.categories.filter(c => c !== category)
    });
  };

  const imageDelete = (image) => {
    setProduct({
      ...product,
      image: product.image.filter(img => img !== image)
    });
  };

  const listCategory = categoriesState.map(c => c.name);

  return (
    <div className={Styles.container}>
      <div className={Styles.containerOne}>
        <form onSubmit={handleSubmit} className="needs-validation">
          <div className='boxInput'>
            <h4><strong>Sale product</strong></h4>

            {product.image && product.image.map((image, idx) => (
              <div className='myProduct' key={idx}>
                <img src={image} alt="product" />
                <button type="button" onClick={() => imageDelete(image)}>x</button>
              </div>
            ))}

            <div>
              <input
                onChange={handleImage}
                type="text"
                className="form-control"
                name='image'
                placeholder='Image URL...'
                value={product.image.join(", ")}  // Shows comma-separated images
              />
              <p className={Styles.errors}><strong>{errors.image}</strong></p>
            </div>

            <div className='inputsError'>
              <input
                onChange={handleChange}
                value={product.name}
                type="text"
                className="form-control"
                name='name'
                placeholder='Title'
              />
              <p className={Styles.errors}><strong>{errors.name}</strong></p>
            </div>

            <div>
              <input
                onChange={handleChange}
                value={product.price}
                type="number"
                className="form-control"
                name='price'
                placeholder='Price'
              />
              <p className={Styles.errors}><strong>{errors.price}</strong></p>
            </div>

            <div>
              <input
                onChange={handleChange}
                value={product.stock}
                type="number"
                className="form-control"
                name='stock'
                placeholder='Stock'
              />
              <p className={Styles.errors}><strong>{errors.stock}</strong></p>
            </div>

            <div>
              <input
                onChange={handleChange}
                value={product.description}
                type="text"
                className="form-control"
                name='description'
                placeholder='Description'
              />
              <p className={Styles.errors}><strong>{errors.description}</strong></p>
            </div>

            <div>
              <select className="form-control" onChange={handleCategory} value={product.categories}>
                <option value="">Choose your category...</option>
                {listCategory.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {product.categories.map((category, idx) => (
                <div className={Styles.category} key={idx}>
                  <p>{category}</p>
                  <button type="button" onClick={() => handleDelete(category)}>X</button>
                </div>
              ))}
            </div>

            <div className='btn'>
              <button className="btn btn-primary" type="submit">Post</button>
            </div>
          </div>
        </form>
      </div>

      <div className={Styles.containerTwo}>
        <div className={Styles.containerImg}>
          {product.image && product.image.map((img, idx) => (
            <div className={Styles.showImg} key={idx}>
              <img src={img} alt="product" />
            </div>
          ))}
        </div>

        <div className={Styles.showProduct}>
          <h2>{product.name}</h2>
          <label>Price: ${product.price}</label>
          <label>Stock: {product.stock}</label>
          <label>Description: {product.description}</label>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
