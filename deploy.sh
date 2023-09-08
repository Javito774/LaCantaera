#!/bin/bash

# Define tus detalles de servidor y ruta local
server_address="access971736122.webspace-data.io"
username="u113117690"
local_code_path="./cartas"
remote_code_path="/kunden/homepages/30/d971736122/htdocs/cartas"
password="HL8nwXKK@G.sAt#"
# Utiliza el comando SCP con expect para copiar los archivos al servidor
expect -c "
spawn scp -r \"$local_code_path\" \"$username@$server_address:$remote_code_path\"
expect \"password:\"
send \"$password\n\"
expect eof
"
# Verifica el estado de salida de expect
if [ $? -eq 0 ]; then
    echo "Codigo desplegado con exito."
else
    echo "Error en el despliegue del codigo. Codigo de salida: $?"
fi
