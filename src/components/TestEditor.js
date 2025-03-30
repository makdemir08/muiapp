import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Box } from '@mui/material'

export default function TestEditor() {
  return (
    <Box sx={{
      '& .ck-editor__editable_inline': {
        minHeight: '200px',
        color: 'text.primary',
        bgcolor: 'background.paper'
      }
    }}>
      <CKEditor
        editor={ClassicEditor}
        data="<p>MUI ile entegre CKEditor</p>"
      />
    </Box>
  )
}