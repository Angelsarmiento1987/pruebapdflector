import React, { useEffect, useRef, useState } from "react";

const Home = () => {
  const videoRef = useRef(null);
  const [status, setStatus] = useState("🔄 Iniciando cámara...");

  useEffect(() => {
    const startCamera = async () => {
      const constraints = {
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user", // cámara frontal
        },
        audio: false,
      };

      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const video = videoRef.current;

        // Aseguramos que el objeto de medios se adjunta correctamente
        if ("srcObject" in video) {
          video.srcObject = stream;
        } else {
          video.src = window.URL.createObjectURL(stream);
        }

        // Estas líneas ayudan a evitar errores de reproducción
        video.onloadedmetadata = () => {
          video.play()
            .then(() => {
              setStatus("✅ Cámara activa y en reproducción");
            })
            .catch((err) => {
              console.error("Error al reproducir el video:", err);
              setStatus(`❌ Error al reproducir: ${err.message}`);
            });
        };
      } catch (err) {
        console.error("Error al acceder a la cámara:", err);
        setStatus(`❌ No se pudo acceder: ${err.message}`);
      }
    };

    startCamera();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>🧪 Prueba de Cámara</h1>
      <p>{status}</p>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        width="640"
        height="480"
        style={{
          backgroundColor: "black",
          border: "3px solid #ccc",
          marginTop: "10px",
        }}
      />
    </div>
  );
};

export { Home };
