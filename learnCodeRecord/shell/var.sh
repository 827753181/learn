a='a1'
b="b2222"
echo $a$b
echo ${a} ${b}
c=${a}${b}
echo ${#a} ${b:0:2} ${c:0:3}

unset a # 删除变量
echo ${a}

name=(
  '1111'
  $b
)

name[2]=$c

echo "数组长度为${#name}数组第一个是${name[0]} 数组最后一个元素是${name[`#name`-1]};"
# 输出所有数组元素
echo ${name[*]}
# 取得数组元素的个数
echo ${#name[@]}
# 或者
echo ${#name[*]}
# 取得数组单个元素的长度
echo ${#name[n]}
echo ${name[`${#name}-1`]}