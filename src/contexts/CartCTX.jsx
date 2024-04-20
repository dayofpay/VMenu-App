import { createContext} from "react";
import { useNavigate } from "react-router-dom";


import usePersistedState from "../hooks/usePersistedState";
import { PATH_LIST } from "../utils/pathList";
import { ProductDetailsKeys } from "../keys/formKeys";
export const CartContext = createContext();

export const CartProvider = ({
    children,

}) => {
    const navigate = useNavigate();
    const [auth,setAuth] = usePersistedState('auth',{});
    const loginSubmitHandler = async (values) => {
      const result = await authService.login(values.email,values.password);
  
      if(result.code !== 403){
        navigate(PATH_LIST.home);
      }
      setAuth(result);
      localStorage.setItem('accessToken',result.accessToken);
      localStorage.setItem('user_id', result._id);

      
    }
    const logValues = {
        // Insert submit handlers here
  } 
     return (
        <AuthContext.Provider value={logValues}>
            {children}
        </AuthContext.Provider>
    )
}
CartContext.displayName = 'CartContext';
export default CartContext;