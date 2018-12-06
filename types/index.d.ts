import Vue, { VueConstructor } from 'vue'
import {
  VueListviewProps,
  VueListviewContainerProps,
  FilterButton,
  FilterField,
  TableColumn
} from './component'

export declare class Props extends VueListviewProps {}

declare class Listview extends VueListviewProps {
  static install(Vue: VueConstructor<Vue>, options: any): void
}

declare class ListviewContainer extends VueListviewContainerProps {
  static install(Vue: VueConstructor<Vue>, options: any): void
}

export default Listview
export { Listview, ListviewContainer, FilterButton, FilterField, TableColumn }
