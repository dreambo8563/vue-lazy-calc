import Vue, { VueConstructor } from "vue";
import { LazyBase } from "./main";
declare module "vue/types/vue" {
  interface Vue {
    $lzCalc: LazyBase;
  }
  interface VueConstructor {
    $lzCalc: LazyBase;
  }
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    $lzCalc?: LazyBase;
  }
}

export { VueConstructor };
export default Vue;
