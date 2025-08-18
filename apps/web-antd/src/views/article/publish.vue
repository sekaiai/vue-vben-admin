<script lang="ts" setup>
import type { Rule } from 'ant-design-vue/es/form';

import type { UnwrapRef } from 'vue';

import { reactive, ref, toRaw } from 'vue';

import { Page } from '@vben/common-ui';

import {
  Button,
  Card,
  DatePicker,
  Form,
  FormItem,
  Input,
  message,
  Select,
  SelectOption,
  Switch,
  Textarea,
} from 'ant-design-vue';

// 作者更新子文档接口
export interface AuthorUpdate {
  updateTime: string;
  content: string;
}

// 主文档接口
export interface Article {
  title: string; // 标题
  description: string; // 简介
  review?: string; // 复盘（可选）
  content?: string; // 文章内容
  price?: number; // 价格
  package?: string[]; // 套餐（可选）
  tags: string[]; // 标签
  refundGuarantee: boolean; // 不红退（不赢退钱）
  presale: boolean; // 预售
  deadline?: string; // 截止时间（可选）
  publishDate?: string; // 发布时间（可选）
  status: 'archived' | 'pending' | 'published'; // 状态
  updates: AuthorUpdate[]; // 作者更新记录
}

const formRef = ref<typeof Form>();
// const wrapperCol = { span: 7 };
const formState: UnwrapRef<Article> = reactive({
  title: '', // 标题
  description: '', // 简介
  review: '', // 复盘（可选）
  content: `你好哦，世界`, // 付费内容（可选）
  price: 0, // 价格
  package: [], // 套餐（可选）
  tags: [], // 标签
  refundGuarantee: false, // 不红退（不赢退钱）
  presale: false, // 预售
  deadline: '', // 截止时间（可选）
  publishDate: '', // 发布时间（可选）
  status: 'pending', // 状态  | 'published' | 'archived';
  updates: [{ updateTime: '', content: '' }], // 作者更新记录
});

const rules: Record<string, Rule[]> = {
  name: [
    {
      required: true,
      message: 'Please input Activity name',
      trigger: 'change',
    },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  date1: [
    {
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
      type: 'object',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  desc: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
};

const onSubmit = () => {
  formRef.value
    ?.validate()
    .then(() => {
      const values = toRaw(formState);
      // console.log('values', formState, values);

      message.success({
        content: `form values: ${JSON.stringify(values)}`,
      });
    })
    .catch((error: any) => {
      console.error('error', error);
    });
};

const resetForm = () => {
  formRef.value?.resetFields();
};

const packageOptions = ref<any[]>([
  { value: '1', label: '套餐1' },
  { value: '2', label: '套餐2' },
  { value: '3', label: '套餐3' },
  { value: '4', label: '套餐4' },
]);
</script>

<template>
  <Page auto-content-height>
    <Card class="mb-5" title="新文章">
      <Form
        ref="formRef"
        :model="formState"
        :rules="rules"
        layout="vertical"
        class="max-w-screen-md"
      >
        <FormItem label="标题" name="title" class="w-96">
          <Input v-model:value="formState.title" />
        </FormItem>
        <FormItem label="简介" name="description">
          <Textarea v-model:value="formState.description" />
        </FormItem>

        <FormItem label="套餐（可选）" name="package">
          <Select
            :get-popup-container="(trigger) => trigger.parentNode"
            v-model:value="formState.package"
            mode="multiple"
            placeholder="Inserted are removed"
            style="width: 100%"
            :options="packageOptions"
          />
        </FormItem>

        <FormItem label="复盘内容" name="review">
          <Textarea v-model:value="formState.review" />
        </FormItem>

        <FormItem label="文章内容" name="content">
          <!-- <Textarea v-model:value="formState.content" /> -->

          <!-- <v-md-editor v-model="formState.content" height="500px" /> -->
          <mavon-editor
            editor-background="transparent"
            v-model="formState.content"
          />
        </FormItem>

        <FormItem label="标题" name="title" class="w-96">
          <Input v-model:value="formState.title" />
        </FormItem>
        <FormItem label="价格" name="price">
          <Input v-model:value="formState.price" type="number" />
        </FormItem>
        <FormItem label="不红退" name="refundGuarantee">
          <Switch v-model:checked="formState.refundGuarantee" />
        </FormItem>
        <FormItem label="预售" name="presale">
          <Switch v-model:checked="formState.presale" />
        </FormItem>
        <FormItem label="截止时间" name="deadline">
          <DatePicker
            v-model:value="formState.deadline"
            show-time
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </FormItem>
        <FormItem label="发布时间" name="publishDate">
          <DatePicker
            v-model:value="formState.publishDate"
            show-time
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </FormItem>
        <FormItem label="状态" name="status">
          <Select v-model:value="formState.status" style="width: 100%">
            <SelectOption value="pending">待发布</SelectOption>
            <SelectOption value="published">已发布</SelectOption>
            <SelectOption value="archived">已归档</SelectOption>
          </Select>
        </FormItem>
        <FormItem label="标签" name="tags">
          <Select
            v-model:value="formState.tags"
            mode="tags"
            placeholder="请输入标签"
            style="width: 100%"
          />
        </FormItem>
        <FormItem label="作者更新记录" name="updates">
          <div v-for="(update, index) in formState.updates" :key="index">
            <div># {{ index + 1 }}</div>
            <Textarea
              v-model:value="update.content"
              placeholder="请输入作者更新记录"
            />
          </div>
        </FormItem>

        <FormItem>
          <Button type="primary" @click="onSubmit">Create</Button>
          <Button style="margin-left: 10px" @click="resetForm"> Reset </Button>
        </FormItem>
      </Form>
    </Card>
  </Page>
</template>
