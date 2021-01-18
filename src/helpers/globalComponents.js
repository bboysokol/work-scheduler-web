import { Checkbox, Input, InputNumber, Popover, Tooltip } from "element-ui";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import Button from "../components/Button.vue";
import Card from "../components/Cards/Card.vue";
import DropDown from "../components/Dropdown.vue";
import Modal from "../components/Modal.vue";

import fgInput from "../components/Inputs/formGroupInput.vue";

const GlobalComponents = {
	install(Vue) {
		Vue.component("fg-input", fgInput);
		Vue.component("drop-down", DropDown);
		Vue.component("card", Card);
		Vue.component("n-button", Button);
		Vue.component("n-checkbox", Checkbox);
		Vue.component(Input.name, Input);
		Vue.component(Modal.name, Modal);

		Vue.component(InputNumber.name, InputNumber);
		Vue.use(Tooltip);
		Vue.use(Popover);
		Vue.component("ValidationProvider", ValidationProvider);
		Vue.component("ValidationObserver", ValidationObserver);
	}
};

export default GlobalComponents;
