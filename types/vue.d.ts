import Vue, { VueConstructor } from "vue";
import { ILazyCalc } from "./main";
declare module "vue/types/vue" {
  interface Vue {
    $lzCalc?: ILazyCalc;
  }
  interface VueConstructor {
    $lzCalc?: ILazyCalc;
  }
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    $lzCalc?: ILazyCalc;
  }
}

export { VueConstructor };
export default Vue;
