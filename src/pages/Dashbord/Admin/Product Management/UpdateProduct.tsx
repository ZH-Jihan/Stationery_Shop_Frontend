import { useParams } from "react-router-dom";
import AddProduct from "./AddProduct";

const UpdateProduct = () => {
  const { productId } = useParams();
  console.log(productId);

  return (
    <div>
      <AddProduct productId={productId} />
    </div>
  );
};

export default UpdateProduct;
