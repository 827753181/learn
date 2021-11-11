# input your command here
echo hello,world!
if ($ENV == 'dev'); then
  curl https://cs.console.aliyun.com/hook/trigger?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbHVzdGVySWQiOiJjNmIwMWNmM2Q3ZWRmNGJiMWE5YjA3NWEzNzlhODJmMGUiLCJpZCI6IjE1ODI1NyJ9.W9Plj5-wG53l0-HquGUJVx-LrEVK-n7FGiT_KqlGplMaHextnkMgOs7ZwIxWmYxM6P1igOk4x_P1ZCRAx5FyhtXNLLRUezs7TFWh5t4qPh0mpVajm_9rzwHU4pRiBmQ1crp2oH120cnfcJ8JYcvTVsXKEY3et6yPS38LxAe-vpY
elif ($ENV == 'test'); then
  curl https://cs.console.aliyun.com/hook/trigger?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbHVzdGVySWQiOiJjNmIwMWNmM2Q3ZWRmNGJiMWE5YjA3NWEzNzlhODJmMGUiLCJpZCI6IjE1ODI1NyJ9.W9Plj5-wG53l0-HquGUJVx-LrEVK-n7FGiT_KqlGplMaHextnkMgOs7ZwIxWmYxM6P1igOk4x_P1ZCRAx5FyhtXNLLRUezs7TFWh5t4qPh0mpVajm_9rzwHU4pRiBmQ1crp2oH120cnfcJ8JYcvTVsXKEY3et6yPS38LxAe-vpY
elif ($ENV == 'pre'); then
  curl https://cs.console.aliyun.com/hook/trigger?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbHVzdGVySWQiOiJjNmIwMWNmM2Q3ZWRmNGJiMWE5YjA3NWEzNzlhODJmMGUiLCJpZCI6IjE1ODI1NyJ9.W9Plj5-wG53l0-HquGUJVx-LrEVK-n7FGiT_KqlGplMaHextnkMgOs7ZwIxWmYxM6P1igOk4x_P1ZCRAx5FyhtXNLLRUezs7TFWh5t4qPh0mpVajm_9rzwHU4pRiBmQ1crp2oH120cnfcJ8JYcvTVsXKEY3et6yPS38LxAe-vpY
elif ($ENV == 'prod'); then
  curl https://cs.console.aliyun.com/hook/trigger?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbHVzdGVySWQiOiJjNmIwMWNmM2Q3ZWRmNGJiMWE5YjA3NWEzNzlhODJmMGUiLCJpZCI6IjE1ODI1NyJ9.W9Plj5-wG53l0-HquGUJVx-LrEVK-n7FGiT_KqlGplMaHextnkMgOs7ZwIxWmYxM6P1igOk4x_P1ZCRAx5FyhtXNLLRUezs7TFWh5t4qPh0mpVajm_9rzwHU4pRiBmQ1crp2oH120cnfcJ8JYcvTVsXKEY3et6yPS38LxAe-vpY
fi


for file in $(ls ./); do
  echo ${file}
done

for ((i = 0; i < 10; i++)); do
  echo ${i}
done


