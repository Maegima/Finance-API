npm install --save typescript ts-node typeorm reflect-metadata sqlite3 typeorm-extension
npm install --save-dev @types/yargs

file="./node_modules/@trapi/query/dist/parameter/sort/type.d.ts"
old_text="SortBuildInput<T>"
new_text="SortBuildInput<T extends Record<string, any>>"

sed --in-place=.bkp "s/$old_text/$new_text/g" $file 