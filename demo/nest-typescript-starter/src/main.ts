import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
function minCoinChange(coins, amount) {
  const cache = [];
  const makeChange = (value) => {
    if (!value) {
      return [];
    }
    if (cache[value]) {
      return cache[value];
    }
    let min = [];
    let newMin, newAmount;
    for (let i = 0; i < coins.length; i++) {
      const coin = coins[i];
      newAmount = value - coin;
      if (newAmount >= 0) {
        newMin = makeChange(newAmount);
      }
      if (
        newAmount >= 0 &&
        (newMin.length < min.length - 1 || !min.length) &&
        (newMin.length || !newAmount)
      ) {
        min = [coin].concat(newMin);
        console.log(`newMin ${min} for ${amount}`);
      }
    }
    return (cache[value] = min);
  };
  return makeChange(amount);
}
