<template>
  <div class="modal fade" :id="'form-modal'+s._id">
    <div class="modal-dialog h90 d-flex align-items-center">
      <div class="modal-content">
        <div class="modal-header">
          <h4>{{s.firstName+' '+s.lastName}}'s new form</h4>
        </div>
        <div class="modal-body">
          <em
            @click="newCheckBox.active = !newCheckBox.active"
            class="clickable mb-2 w-fc"
          >{{newCheckBox.active ? "Discard" : "Add a checkbox"}}</em>
          <ul class="list-group">
            <li v-if="newCheckBox.active" class="input-group d-flex">
              <input
                type="text"
                v-model="newCheckBox.key"
                placeholder="task or missing assignment"
                class="w-75"
              >
              <div class="input-group-append">
                <div class="input-group-text">
                  <input type="checkbox" v-model="newCheckBox.value">
                </div>
              </div>
              <div class="input-group-append">
                <div class="input-group-text">
                  <i
                    @click="addCheckBox"
                    class="clickable far fa-save fa-lg text-success justify-self-end"
                  ></i>
                </div>
              </div>
            </li>
            <li v-for="(value, key) in checkBoxes" class="list-group-item d-flex">
              <h5>{{reverseCamelCase(key)}}</h5>
              <div class="input-group-append">
                <div class="input-group-text">
                  <input type="checkbox" :checked="value" @change="flip(key)">
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import camelCase from "lodash.camelcase";

export default {
  name: "create-form-modal",
  props: ["s", "cId"],
  data() {
    return {
      checkBoxes: {},
      newCheckBox: {
        active: false,
        key: "",
        value: false
      }
    };
  },
  methods: {
    addCheckBox() {
      this.checkBoxes[camelCase(this.newCheckBox.key)] = this.newCheckBox.value;
      this.newCheckBox = {
        active: false,
        key: "",
        value: false
      };
    },
    reverseCamelCase(str) {
      let out = "";
      let found = false;
      let nums = "";
      for (let i = 0; i < str.length; i++) {
        if (str[i].match(/\d/)) {
          nums += str[i];
          if (i == str.length - 1) {
            out += " " + nums;
          }
          continue;
        }
        if (!found) {
          if (nums.length) {
            out += nums + " ";
            nums = "";
          }
          out += str[i].toUpperCase();
          found = true;
          continue;
        }
        if (str[i] == str[i].toUpperCase()) {
          if (nums.length) {
            out += " " + nums;
            nums = "";
          }
          out += " ";
        }
        out += str[i];
      }
      return out;
    },
    //hacky method not working!
    //can't modify value of checkbox in the data :/
    flip(key) {
      let value = !this.checkBoxes[key];
      delete this.checkBoxes[key];
      this.checkBoxes[key] = value;
    }
  }
};
</script>
