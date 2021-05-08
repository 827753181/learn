import { Injectable } from '@nestjs/common';
import { create } from 'domain';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];
  create(cat: Cat) {
    this.cats.push(cat);
  }
  findAll(): Cat[] {
    return this.cats;
  }
}
