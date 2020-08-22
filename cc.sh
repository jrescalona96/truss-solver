cd src/components/$1
FILENAME=$2
mkdir $FILENAME
cd $FILENAME
echo "#$2{}"  > "$2.scss"
echo "import React from 'react';\nimport './$FILENAME.scss';const $FILENAME = () => {return <div></div>;}; export default $FILENAME" > "$FILENAME.jsx"
echo "import $FILENAME from './$FILENAME';\nexport default $FILENAME;"  > "index.js"
echo "Component $1 created!...\n"