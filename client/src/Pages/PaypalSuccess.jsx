import React, { useEffect } from "react";
import Swal from "sweetalert2";
import dino from "../assets/dinoVolador.png";
import { useHistory } from "react-router-dom";

export default function PaypalSuccess() {
  const history = useHistory();

  useEffect(() => {
    Swal.fire({
      title: "¡Compra exitosa!",
      text: "Revisa tu correo para más detalles.",
      icon: "success",
      confirmButtonText: "Ir a inicio",
      imageUrl: dino,
      imageWidth: 180,
      imageHeight: 180,
      customClass: {
        popup: 'popup-alert',
        text: 'titleAlert',
        content: 'titleAlert'
      },
    }).then(() => {
      history.push("/");
    });
  }, [history]);

  return (
    <div style={{ minHeight: 'calc(100vh - 250px)', boxSizing: 'border-box' }}></div>
  );
} 