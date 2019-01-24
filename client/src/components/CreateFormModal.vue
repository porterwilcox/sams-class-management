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
            <li v-for="(value, key) in checkBoxes" :key="key" class="list-group-item d-flex justify-content-between">
              <h5>{{reverseCamelCase(key)}}</h5>
              <div class="input-group-append">
                <div class="input-group-text">
                  <input type="checkbox" :checked="value" v-model="checkBoxes[key]" />
                </div>
              </div>
            </li>
          </ul>
          <button type="button" @click="createForm" class="btn btn-outline-primary">Create Form</button>
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
    createForm() {
      console.log(this.checkBoxes)
    }
  }
};
</script>