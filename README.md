# VitaPass · visor del QR de emergencia

Página estática que abre los resúmenes de salud de los QR y pegatinas NFC de VitaPass.

- Solo contiene el código compilado del visor. **No hay datos**: el contenido viaja cifrado y se descifra en el navegador de quien escanea; la clave va en el fragmento `#` de la URL, que nunca se envía a ningún servidor.
- Se genera desde el repositorio privado del proyecto (`apps/web/visor-estatico/construir.mjs`). No se edita a mano.
