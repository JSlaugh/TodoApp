<template>
  <div v-if="task">
    <p><strong>Title:</strong> {{ task.title }}</p>
    <p><strong>Comments:</strong> {{ task.comments }}</p>
    <p><strong>Priority Level:</strong> {{ task.priority_level }}</p>
    <p><strong>Due Date:</strong> {{ task.due_date }}</p>

    <div v-if="user.id === task.author.id">
      <p>
        <router-link :to="{ name: 'EditTask', params: { id: task.id } }" class="btn btn-primary"
          >Edit</router-link
        >
      </p>
      <p><button @click="removeTask()" class="btn btn-secondary">Delete</button></p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";

export default defineComponent({
  name: "Task",
  props: ["id"],
  async created() {
    try {
      console.log("hi"); //TODO debug
      let taskId = this.id;
      console.log(`${taskId}`); //TODO debug
      // this calls the store method that in there it sets the task
      await this.viewTask(taskId);
      console.log("Testing if this gets hit"); //TODO debug
    } catch (error) {
      console.log("hey this is getting hit"); //TODO debug
      console.error(error);
      this.$router.push("/dashboard");
    }
  },
  computed: {
    // and then here it grabs that task from the store
    ...mapGetters({ task: "stateTask", user: "stateUser" }),
  },
  methods: {
    ...mapActions(["viewTask", "deleteTask"]),
    async removeTask() {
      try {
        await this.deleteTask(this.id);
        this.$router.push("/dashboard");
      } catch (error) {
        console.error(error);
      }
    },
  },
});
</script>
