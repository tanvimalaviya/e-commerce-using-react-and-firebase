
import MyContext from './MyContext';
import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';
import toast from 'react-hot-toast';


const MyState = ({children}) => {
  const [Loading,setLoading] = useState(false);

    // User State
    const [getAllProduct, setGetAllProduct] = useState([]);
   /**========================================================================
    * get all product function
     *========================================================================**/

    const getAllProductFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(fireDB, "products"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc) => {
                    productArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllProduct(productArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    //order state
        const [getAllOrder , setGetAllOrder] = useState([])

        /**========================================================================
    * get all order function
     *========================================================================**/

        const getAllOrderFunction = async() => {
            setLoading(true);
            try {
                const q = query(
                collection(fireDB, "order"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let orderArray = [];
                QuerySnapshot.forEach((doc) => {
                    orderArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllOrder(orderArray);
                setLoading(false);
            });
            return () => data;
                
            } catch (error) {
                console.log(error)
                setLoading(false);
            }
        }
        //delete order function

        const orderDelete = async(id) => {
            setLoading(true);
            try {
                await deleteDoc(doc(fireDB,'order', id));
                toast.success("order deleted successfully");
                getAllOrderFunction();
                setLoading(false);
                
            } catch (error) {
               console.log(error) ;
               setLoading(false);
            }
        }

        //order state
        const [getAllUser , setGetAllUser] = useState([])

        /**========================================================================
    * get all user function
     *========================================================================**/

        const getAllUserFunction = async() => {
            setLoading(true);
            try {
                const q = query(
                collection(fireDB, "user"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let userArray = [];
                QuerySnapshot.forEach((doc) => {
                    userArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllUser(userArray);
                setLoading(false);
            });
            return () => data;
                
            } catch (error) {
                console.log(error)
                setLoading(false);
            }
        }

    useEffect(() => {
        getAllProductFunction();
        getAllOrderFunction();
        getAllUserFunction();
    }, []);
 
  return (
    <div>
        <MyContext.Provider value={{
          Loading,
          setLoading,
          getAllProduct,
          getAllProductFunction,
          getAllOrder,
          orderDelete,
          getAllUser
        }}>
            {children}

        </MyContext.Provider>
    </div>
  )
}

export default MyState
