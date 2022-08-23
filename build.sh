#!/bin/bash

# emulate env vars for jenkins env vars
if [ "${BUILD_NUMBER}" = "" ]; then
  export BUILD_NUMBER=999
fi

if [ "${GIT_BRANCH}" = "" ]; then
  export GIT_BRANCH=origin/develop
fi


# set branch name
echo ${GIT_BRANCH} > branchname.txt
branchName=`sed "s/origin\///" branchname.txt`
echo "branchName is set to '${branchName}'"

# set postfix
if [ "$branchName" = "develop" ]; then
  postfix="-dev"
elif [ "$branchName" = "integration" ]; then
  postfix="-int"  
elif [ "$branchName" = "staging" ]; then
  postfix="-stg"
elif [ "$branchName" = "production" ]; then
  postfix=""
else
  echo "invalid branchName '${branchName}'"
  exit -1
fi

rm -rf branchname.txt

echo "postfix is set to '${postfix}'"

sed -i "s/kyc.useb.co.kr/kyc${postfix}.useb.co.kr/" js/kyc.js

sed -i -E "s/(src=\"[^=]*=)(__VERSION__)/\1${BUILD_NUMBER}${postfix}/g" index.html
sed -i -E "s/(src=\"[^=]*=)(__VERSION__)/\1${BUILD_NUMBER}${postfix}/g" test.html

exit 0


