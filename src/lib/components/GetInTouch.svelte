<script lang="ts">
  import { enhance, applyAction } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
  import Button from "./Button.svelte";
  import Input from "./Input.svelte";
  import TextArea from "./TextArea.svelte";
	import { Toast } from '$lib/stores/toast';

  interface IField {
    value: string;
    error: string;
    touched: boolean;
  }

  interface IFormData {
    email: IField;
    subject: IField;
    message: IField;
  }

  let isOkayToSend = false;
  let formData: IFormData;
  let formError = '';

  resetFormData();

  $: {
    if (formData) {
      const { email, subject, message } = formData;
      const res = !email.value ||
        email.error || 
        !subject.value ||
        subject.error ||
        !message.value ||
        message.error;
      
      isOkayToSend = !!res;
    }
  }

  function onEnhancedSubmitResponse(result: ActionResult<Record<string, unknown> | undefined, Record<string, unknown> | undefined>) {
    if (result.type === 'success') {
      resetFormData();

      Toast.add({
        message: 'Message sent successfully!',
        type: 'success',
      });
    }
    
    if (result.type ==='failure') {
      if (result.data?.field) {
        const { field, message } = result.data;
        formData[field as keyof IFormData].error = message as string;
      } else {
        console.log('failure: ', result);
        formError = result.data?.message as string;
      }
    }

    if (result.type === 'error') {
      formError = result.error?.message;
    }

    applyAction(result);
  }

  function onKeypress(field: keyof typeof formData) {
    return function(e: Event) {
      const { value } = e.target as HTMLInputElement;
      formError = '';
      formData[field].error = '';
      formData[field].value = value;
    }
  }

  function resetFormData() {
    formError = '';
    formData = {
      email: {
        value: '',
        error: '',
        touched: false,
      },
      subject: {
        value: '',
        error: '',
        touched: false,
      },
      message: {
        value: '',
        error: '',
        touched: false,
      },
    }
  }
</script>

<div class="get-in-touch">
  <form
    method="POST"
    action="/get-in-touch"
    use:enhance={() => {
      return ({ result }) => onEnhancedSubmitResponse(result);
    }}
  >
    <Input
      type="email" 
      id="email" 
      name="email" 
      label="Email"
      value={formData?.email.value}
      error={formData?.email.touched && !formData?.email.value ? 'An email is required' : formData?.email.error}
      on:blur={() => {
        formData.email.touched = true;
      }}
      on:keypress={onKeypress('email')}
    />

    <Input
      type="text" 
      id="subject" 
      name="subject" 
      label="Subject"
      value={formData?.subject.value}
      error={formData?.subject.touched && !formData?.subject.value ? 'A subject is required' : formData?.subject.error}
      on:blur={() => {
        formData.subject.touched = true;
      }}
      on:keypress={onKeypress('subject')}
    />
    
    <TextArea
      id="message" 
      name="message" 
      label="Message"
      value={formData?.message.value}
      error={formData?.message.touched && !formData?.message.value ? 'A message is required' : formData?.message.error}
      on:blur={() => {
        formData.message.touched = true;
      }}
      on:keypress={onKeypress('message')}
    />

    {#if formError}
      <div class="form-error-container">
        <p class="error">{formError}</p>
      </div>
    {/if}

    <div class="buttons-container">
      <Button
        type="submit"
        disabled={isOkayToSend}
      >
        Send
      </Button>
    </div>
  </form>
</div>

<style lang="scss">
  .get-in-touch {
    form {
      --textarea-height: 20rem;

      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: flex-start;
      gap: 1rem;
      padding: 1rem;
      border: none;
      outline: none;

      .buttons-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        gap: 1rem;
      }

      @media (min-width: 768px) {
        --textarea-height: 10rem;
      }
    }

    .form-error-container {
      text-align: center;
    }
  }
</style>