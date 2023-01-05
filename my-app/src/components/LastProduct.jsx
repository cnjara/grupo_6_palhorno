import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { fetchWithoutToken } from "../hooks/useFetch";



export const LastProduct = () => {
  const [product, setProduct] = useState({
    loading: true,
    data:[],
  });

  useEffect(() => {
    fetchWithoutToken("/productos")
      .then(({ productos }) => {
        console.log("largo: ",productos.length)
        console.log("productos: ",productos)
        if(productos.length != 0){
        //  const { data } = productos;
        console.log("que es data:",productos[productos.length-1])
        setProduct({
          ...product,
          loading: false,
          data: productos[productos.length-1],
        });
        console.log("Esto es data final: ",product.data   )

      }else{
        setProduct({
          ...productos,
          error: productos.error,
      });
      }
             })
      .catch(() => console.error);
  }, [product]);

  return (
    <div className="col-lg-6 mb-4">
      {product.loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h5 className="m-0 font-weight-bold text-gray-800">
              Último producto agregado
            </h5>
          </div>
          <div className="card-body">
            <div className="text-center">
              <img
                className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                style={{ width: "40rem" }}
                src={`http://localhost:3030/api/productos/imagen/${product.data.imagenes[0].archivo}`}//imagen
                alt=" Star Wars - Mandalorian "
              />
            </div>
         
            <a
              className="btn btn-danger"
              target="_blank"
              rel="nofollow"
              href="/"
            >
             
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
