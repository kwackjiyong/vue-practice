<template>
  <div class="hello" id="exceltable">
    
      <table ref="excelTable" border="1" style="border-collapse: collapse;" align="center">
        <tr>
          <th colspan="6">
            <h1 align="center" width="100%"><b>개발자 이력카드</b></h1>
          </th>
        </tr>
        <tr>
          <td width="13%" style="background-color:lightgray;text-align:center;">성  명</td><td width="12%"></td>
          <td width="13%" style="background-color:lightgray;text-align:center;">영문성명</td><td width="12%"></td>
          <td width="12%" style="background-color:lightgray;text-align:center;">기술등급</td><td width="13%"></td>
        </tr>
        <tr>
          <td width="13%" style="background-color:lightgray;text-align:center;">주  소</td><td width="12%" colspan="3"></td>
          <td width="13%" style="background-color:lightgray;text-align:center;">생년월일</td><td width="12%"></td>
        </tr>
        <tr>
          <td width="13%" style="background-color:lightgray;text-align:center;">전산경력</td><td width="12%"></td>
          <td width="13%" style="background-color:lightgray;text-align:center;">부  서</td><td width="12%"></td>
          <td width="12%" style="background-color:lightgray;text-align:center;">직  위</td><td width="13%"></td>
        </tr>
      </table>
      <button @click="exportExcel">엑셀다운 (vue xlsx라이브러리 사용)</button>
      <button @click="exportWord">워드다운(html/word 다운링크 활용)</button>
      <button @click="createDoc">워드다운(vue docx 라이브러리 사용)</button>
  </div>
</template>
<script>
import XLSX from 'xlsx'
import {Document,Paragraph,Packer,TextRun,Table,TableRow,TableCell,Header,WidthType,ShadingType,AlignmentType, VerticalAlign} from "docx"
import { saveAs } from "file-saver"
export default {
  name: 'HelloWorld',
  data() {
    return {
    };
  },
  methods:{
    exportExcel(){
      const wb = XLSX.utils.book_new()
      //const ws = XLSX.utils.json_to_sheet(this.tableData)
      const ws = XLSX.utils.table_to_sheet(this.$refs.excelTable)
      XLSX.utils.book_append_sheet(wb,ws,'sheet1')
      var today = new Date()
      XLSX.writeFile(wb,'result'+today+'.xlsx')
    },
    exportWord(){
      var html = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
        var footer = "</body></html>";
        html = html+this.$refs.excelTable.innerHTML+footer;
        console.log(html);
        var filename = '';
        
        //link url
        var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
        
        //file name
        filename = filename?filename+'.doc':'document.doc';
        
        // Creates the  download link element dynamically
        var downloadLink = document.createElement("a");
    
        document.body.appendChild(downloadLink);
        
        //Link to the file
        downloadLink.href = url;
            
        //Setting up file name
        downloadLink.download = filename;
            
        //triggering the function
        downloadLink.click();
        //Remove the a tag after donwload starts.
        document.body.removeChild(downloadLink);
    },
    createDoc: function () {
        // Create a new Document an save it in a variable
        let doc = new Document();
        // Documents contain sections, you can have multiple sections per document, go here to learn more about sections
        // This simple example will only contain one section 
        let shadingObj = {
              fill: "D3D3D3",
              val: ShadingType.CLEAR,
              olor: "auto",
        }

        doc.addSection({
          headers: {
            default: new Header({
                children: [new Paragraph("오픈오브젝트 PMS에서 쓰여짐")],
            }),
        },
        properties: {},
          children: [
          new Paragraph({
            alignment : AlignmentType.CENTER,
            children: [
            new TextRun({
              text: '개발자 이력카드',
              bold: true,
              size: 45
            }),
            ],
            
          }),
          new Paragraph({
            children: [
            new TextRun({
              text: '',
              size: 40
            }),
            ],
          }),
          new Table({
                alignment: AlignmentType.CENTER,
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({text:"성  명", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                width :{ size: 10 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                                columnSpan:2,
                                width :{ size: 20 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"영문성명", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                width :{ size: 10 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                                columnSpan:4,
                                width :{ size: 40 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"기술등급", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                width :{ size: 10 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                                width :{ size: 10 ,type: WidthType.PERCENTAGE }
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({text:"주  소", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                width :{ size: 10 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                                columnSpan:7,
                                width :{ size: 70 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"생년월일", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                width :{ size: 10 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                                width :{ size: 10 ,type: WidthType.PERCENTAGE }
                            }),
                        ],

                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({text:"전산경력", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                width :{ size: 10 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                                columnSpan:2,
                                width :{ size: 20 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"부  서", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                width :{ size: 10 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                                columnSpan:4,
                                width :{ size: 40 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"직  위", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                width :{ size: 10 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                                width :{ size: 10 ,type: WidthType.PERCENTAGE }
                            }),
                        ],
                    }),

                    
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                                width :{ size: 10 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"대학교", alignment: AlignmentType.CENTER,})],
                                width :{ size: 10 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                                width :{ size: 10 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"과 졸업", alignment: AlignmentType.CENTER,})],
                                width :{ size: 10 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                                width :{ size: 10 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"년", alignment: AlignmentType.CENTER,})],
                                width :{ size: 10 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                                width :{ size: 10 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"월", alignment: AlignmentType.CENTER,})],
                                width :{ size: 10 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"자격증명", alignment: AlignmentType.CENTER,})],
                                width :{ size: 10 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"취득일자", alignment: AlignmentType.CENTER,})],
                                width :{ size: 10 ,type: WidthType.PERCENTAGE }
                            }),
                        ],
                    }),


                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"대학원", alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"과 졸업", alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"년", alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"월", alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                            }),
                        ],
                    }),

                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({text:"보유기술", alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                                columnSpan:9
                            }),
                        ],
                    }),



                ],
                width :{ size: 100 ,type: WidthType.PERCENTAGE }
            }),
            
            new Paragraph({
            children: [
            new TextRun({
              text: '경력사항',
              bold: true,
              size: 25
            }),
            ],
          }),

            new Table({
                alignment: AlignmentType.CENTER,
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({text:"회  사  명", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"기  간", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"직  위", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"담당업무", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({text:"학원 및 전문가과정 교육", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                columnSpan:4
                            }),
                        ],
                    }),

                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                                columnSpan:2
                            }),
                        ],
                    }),


                ],
                width :{ size: 100 ,type: WidthType.PERCENTAGE }
            }),


            
            new Paragraph({
              children: [
              new TextRun({
                text: '주요 프로젝트 경력',
                bold: true,
                size: 25
              }),
              ],
            }),

            new Table({
                alignment: AlignmentType.CENTER,

                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({text:"프로젝트명", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                rowSpan:2,
                                verticalAlign :VerticalAlign.CENTER
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"기  간", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                rowSpan:2,
                                verticalAlign :VerticalAlign.CENTER
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"발주처", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                rowSpan:2,
                                verticalAlign :VerticalAlign.CENTER
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"참여\n범위", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                rowSpan:2,
                                verticalAlign :VerticalAlign.CENTER
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"개발환경", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                columnSpan:4,
                            }),
                        ],
                    }),

                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({text:"H/W", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                verticalAlign :VerticalAlign.CENTER
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"언  어", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                verticalAlign :VerticalAlign.CENTER
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"DB", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                verticalAlign :VerticalAlign.CENTER
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"O/S", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                verticalAlign :VerticalAlign.CENTER
                            }),
                        ],
                    }),
                     new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                            }),
                        ],
                    }),

                ],
                width :{ size: 100 ,type: WidthType.PERCENTAGE }
            }),

            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                    new TextRun({
                        text: '( 참여범위: A - PM, B - 설계, C - 개발, D - 운영, E - 기타 )',
                        size: 18
                    }),
                ],
            }),



          ],
        });
        // To export into a .docx file
        this.saveDocumentToFile(doc, `vuedoc.docx`);
        },
        saveDocumentToFile: function (doc, fileName) {
          const mimeType =
          "application/vnd.openxmlformatsofficedocument.wordprocessingml.document";
          Packer.toBlob(doc).then((blob) => {
          const docblob = blob.slice(0, blob.size, mimeType);
          saveAs(docblob, fileName);
        });
        },
  }
}
</script>

