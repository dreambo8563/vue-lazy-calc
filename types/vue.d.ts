import Vue, { VueConstructor } from "vue";
import { ILazyBase } from "./main";
declare module "vue/types/vue" {
  interface Vue {
    $lzCalc: ILazyBase;
  }
  interface VueConstructor {
    $lzCalc: ILazyBase;
  }
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    $lzCalc?: ILazyBase;
  }
}

export { VueConstructor };
export default Vue;
