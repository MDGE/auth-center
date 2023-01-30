#!/bin/bash
my_name="baimingY123"
echo $my_name
# echo $*
# echo $@

###找到循环###
# projects=('gubang-gateway' 'gubang-operation' 'gubang-order' 'gubang-admin-operation' 'gubang-guest' 'gubang-support' 'gubang-usercenter' 'gubang-oss')
# ps=${projects[@]}
# for projectName in $ps; do
# echo $projectName
# done;

###左边是否大于1###

# if [ $# -ge 1 ];then
# echo $1
# fi

###左边是否等于右边###

# a=10 b=10
# if [ $a == $b ]
# then
#    echo "a 等于 b"
# fi

###是否存在目录###
 
if [ ! -d baimingyu ] ;then
mkdir baimingyu
else 
echo 'has baimingyu'
fi
