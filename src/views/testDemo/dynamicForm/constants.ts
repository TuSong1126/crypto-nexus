import { FormField } from './types'

// 字段模板
export const FIELD_TEMPLATES: FormField[] = [
  {
    id: 'input-template',
    type: 'input',
    label: '文本输入',
    placeholder: '请输入文本',
    required: false,
    visible: true,
    width: 'full'
  },
  {
    id: 'select-template',
    type: 'select',
    label: '下拉选择',
    placeholder: '请选择',
    required: false,
    visible: true,
    width: 'full',
    options: [
      { label: '选项1', value: 'option1' },
      { label: '选项2', value: 'option2' }
    ]
  },
  {
    id: 'checkbox-template',
    type: 'checkbox',
    label: '复选框',
    required: false,
    visible: true,
    width: 'full',
    options: [
      { label: '选项1', value: 'option1' },
      { label: '选项2', value: 'option2' }
    ]
  },
  {
    id: 'radio-template',
    type: 'radio',
    label: '单选框',
    required: false,
    visible: true,
    width: 'full',
    options: [
      { label: '选项1', value: 'option1' },
      { label: '选项2', value: 'option2' }
    ]
  },
  {
    id: 'datePicker-template',
    type: 'datePicker',
    label: '日期选择器',
    placeholder: '请选择日期',
    required: false,
    visible: true,
    width: 'full'
  },
  {
    id: 'upload-template',
    type: 'upload',
    label: '文件上传',
    required: false,
    visible: true,
    width: 'full'
  },
  {
    id: 'container-template',
    type: 'container',
    label: '分区',
    containerTitle: '分区标题',
    children: [],
    width: 'full',
    required: false,
    visible: true
  }
]

// 宽度配置选项
export const WIDTH_OPTIONS = [
  { label: '全宽 (100%)', value: 'full' },
  { label: '半宽 (50%)', value: 'half' },
  { label: '三分之一 (33%)', value: 'third' },
  { label: '四分之一 (25%)', value: 'quarter' }
]
