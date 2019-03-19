import Vue, { VueConstructor } from "vue";
import { LazyCalc } from "./main";
declare module "vue/types/vue" {
  interface Vue {
    $lzCalc: LazyCalc;
  }
  interface VueConstructor {
    $lzCalc: LazyCalc;
  }
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    $lzCalc?: LazyCalc;
  }
}

export { VueConstructor };
export default Vue;
