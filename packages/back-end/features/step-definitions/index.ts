import { setWorldConstructor } from '@cucumber/cucumber';
import MyWorld from './world';

setWorldConstructor(MyWorld);

import './given';
import './when';
import './then';
import './middleware';
