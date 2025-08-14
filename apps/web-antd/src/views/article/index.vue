<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { Page } from '@vben/common-ui';

import { Button, Card, message, notification } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getExampleTableApi } from '#/api';

interface RowType {
  id: number;
  title: string;
  tags: string[];
  category: string;
  price: string;
  yushoou: boolean;
  status: string;
}

const gridOptions: VxeGridProps<RowType> = {
  stripe: true,
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { field: 'id', title: '序号', align: 'left', width: 50 },
    { field: 'title', align: 'left', title: ' 标题', width: 140 },
    { field: 'category', align: 'left', title: '套餐' },
    { field: 'yushou', align: 'left', sortable: true, title: '预售' },
    { field: 'price', align: 'left', sortable: true, title: '价格' },
    { field: 'tags', align: 'left', title: '标签' },
    { field: 'status', align: 'left', title: '状态' },
    {
      field: 'create_at',
      align: 'left',
      formatter: 'formatDateTime',
      title: '创建时间',
    },
    {
      field: 'action',
      align: 'left',
      slots: { default: 'action' },
      title: '操作',
    },
  ],
  exportConfig: {},
  height: '670px',
  keepSource: true,
  proxyConfig: {
    ajax: {
      query: async ({ page, sort }) => {
        return await getExampleTableApi({
          page: page.currentPage,
          pageSize: page.pageSize,
          sortBy: sort.field,
          sortOrder: sort.order,
        });
      },
    },
    sort: true,
  },
  sortConfig: {
    defaultSort: { field: 'yushou', order: 'desc' },
    remote: true,
  },
  toolbarConfig: {
    custom: true,
    export: true,
    import: true,
    refresh: true,
    zoom: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
});

const [QueryForm] = useVbenForm({
  // 默认展开
  collapsed: false,
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  // 提交函数
  handleSubmit: onSubmit,
  // 垂直布局，label和input在不同行，值为 vertical
  // 水平布局，label和input在同一行
  layout: 'vertical',
  schema: [
    {
      // 组件需要在 #/adapter.ts内注册，并加上类型
      component: 'Input',
      // 对应组件的参数
      componentProps: {
        placeholder: '搜索标题（模糊查询）',
      },
      // 字段名
      fieldName: 'title',
      // 界面显示的label
      label: '标题',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
        placeholder: '请选择',
        showSearch: true,
      },
      fieldName: 'status',
      label: '状态',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        filterOption: true,
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
        ],
        placeholder: '请选择',
        showSearch: true,
      },
      fieldName: 'options',
      label: '套餐',
    },
    {
      component: 'RangePicker',
      fieldName: 'rangePicker',
      label: '日期选择框',
    },
  ],
  // 是否可展开
  showCollapseButton: true,
  submitButtonOptions: {
    content: '查询',
  },
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-[repeat(auto-fill,minmax(240px,1fr))]',
});

// grid-template-columns: repeat(auto-fill,minmax(200px,1fr))

function onSubmit(values: Record<string, any>) {
  message.success({
    content: `form values: ${JSON.stringify(values)}`,
  });
}

type NotificationType = 'error' | 'info' | 'success' | 'warning';

function info() {
  message.info('How many roads must a man walk down');
}

function error() {
  message.error({
    content: 'Once upon a time you dressed so fine',
    duration: 2500,
  });
}

function warning() {
  message.warning('How many roads must a man walk down');
}
function success() {
  message.success('Cause you walked hand in hand With another man in my place');
}

function notify(type: NotificationType) {
  notification[type]({
    duration: 2500,
    message: '说点啥呢',
    type,
  });
}
</script>

<template>
  <Page auto-content-height>
    <Card class="mb-5" title="文章列表">
      <QueryForm />

      <Grid grid-class="p-0" table-title="数据列表">
        <template #action>
          <div class="flex gap-2">
            <Button type="primary" ghost size="small">编辑</Button>
            <Button type="primary" danger ghost size="small">删除</Button>
          </div>
        </template>
      </Grid>
    </Card>
  </Page>
</template>
