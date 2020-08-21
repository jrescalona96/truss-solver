cd src/components/$1
FILENAME=$2
mkdir $FILENAME
cd $FILENAME
echo "#$2{}"  > "$2.scss"
echo "import React from 'react';\nimport './$FILENAME.scss';\n\nfunction $FILENAME(props) {return <div id='$FILENAME'>$FILENAME Component</div>;}\n\nexport default $FILENAME;" > "$FILENAME.jsx"
echo "import $FILENAME from './$FILENAME';\nexport default $FILENAME;"  > "index.js"
echo "Component $1 created!...\n"