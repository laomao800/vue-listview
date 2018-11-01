import Vue, { VueConstructor } from 'vue'
import { VueListviewProps } from './component'

export declare class Props extends VueListviewProps {}

export default class VueListview extends VueListviewProps {
  static install(Vue: VueConstructor<Vue>, options: any): void
}
