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
      <br><hr><br>
      <button @click="createDoc">MS-Word download(vue docx 라이브러리 사용)</button><br>
  </div>
</template>
<script>
import {Document,Paragraph,Packer,TextRun,Table,TableRow,TableCell,Header,WidthType,ShadingType,AlignmentType, VerticalAlign} from "docx"
import { saveAs } from "file-saver"
export default {
  name: 'HelloWorld',
  data() {
    return {
    };
  },
  methods:{


    //VUE-DOCX 라이브러리 사용 
    createDoc: function () {
        //ms-word 객체 생성
        let doc = new Document();

        // TD 태그 옵션
        let shadingObj = {
              fill: "d9d9d9",
              val: ShadingType.CLEAR,
              olor: "auto",
        }

        //가상 데이터  -------------------------------------------------------------------------------------

        var pmsName = '개발자명'
        var nowDate = new Date().toLocaleString("ko-KR", {timeZone: "Asia/Seoul"})

        
        //가상 데이터 # 학력사항 (학교명, 학위, 학과명, 졸업일자)
        let rows_education_data ={
            data : [
                {
                    deName : "송현고등학교",
                    deGrade : "고등학교",
                    deSubject : "",
                    deGraduatedDate : "2013-02-01"
                },
                {
                    deName : "경민대학교",
                    deGrade : "학사",
                    deSubject : "융합소프트웨어학과",
                    deGraduatedDate : "2021-02-01"
                },
            ]
        }




        //가상 데이터 # 자격증 (자격증명, 발급기관, 취득일자)
        let rows_certificate_data ={
            data : [
                {
                    deName : "정보처리기사",
                    deAgency : "한국산업인력공단",
                    deDate : "2021-02-01"
                },
                {
                    deName : "전기기사",
                    deAgency : "한국산업인력공단",
                    deDate : "2022-02-03"
                },
            ]
        }
        rows_certificate_data.CLEAR





        //가상 데이터 # 경력사항 (회사명,기간,직위,담당업무)
        let rows_career_data ={
            data : [
                {
                    deName : "오픈오브젝트",
                    deDate : "2020/02/03~2020/02/28",
                    deGrade : "사원",
                    deContents : "서버개발"
                },
                {
                    deName : "오픈오브젝트2",
                    deDate : "2021/02/03~2021/02/28",
                    deGrade : "대리",
                    deContents : "프론트개발"
                },
                {
                    deName : "오픈오브젝트3",
                    deDate : "2021/02/03~2021/02/28",
                    deGrade : "대리",
                    deContents : "퍼블리싱"
                },
                {
                    deName : "오픈오브젝트4",
                    deDate : "2021/02/03~2021/02/28",
                    deGrade : "부장",
                    deContents : "프로젝트매니저"
                }
            ]
        }

        //가상 데이터 # 학원 및 전문가 과정 교육(교육기관명,교육시작일~종료일,교육과정명)
        let rows_training_data ={
            data : [
                {
                    deName : "애플",
                    deDate : "2020/02/03~2020/02/28",
                    deContents : "서버개발"
                },
                {
                    deName : "MS",
                    deDate : "2020/02/03~2020/02/28",
                    deContents : "OS개발"
                },
            ]
        }
        rows_training_data.CLEAR
        

        //가상 데이터 # 주요 프로젝트 경력(프로젝트명, 기간, 발주처, 참여범위, HW, 언어, DB, OS)
        let rows_project_data ={
            data : [
                {
                    deName : "롯데ON",
                    deDate : "2020/02/03~2020/02/28",
                    deOrder : "롯데카드",
                    deRole : "A",
                    deHardWare : "intel i9 10900k",
                    deLanguage : "java,javascript",
                    deDataBase : "Oracle",
                    deOperatingSystem : "Linux" 
                },
                {
                    deName : "신한-오픈뱅킹",
                    deDate : "2020/02/03~2020/02/28",
                    deOrder : "신한카드",
                    deRole : "B",
                    deHardWare : "intel i9 10900k",
                    deLanguage : "java,javascript",
                    deDataBase : "MariaDB",
                    deOperatingSystem : "Windows" 
                },
            ]
        }
        rows_project_data.CLEAR






        //테이블 데이터 주입 부분 ----------------------------------------------

        //학력사항 테이블 객체 초기화
        //테이블 ROW들을 담을 배열을 생성합니다.
        let rows_education = []
        //첫번쨰 TR
        rows_education.push(
            new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({text:"학교명", alignment: AlignmentType.CENTER,})],
                                width :{ size: 30 ,type: WidthType.PERCENTAGE },
                                shading: shadingObj,
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"학위", alignment: AlignmentType.CENTER,})],
                                width :{ size: 20 ,type: WidthType.PERCENTAGE },
                                shading: shadingObj,
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"학과명", alignment: AlignmentType.CENTER,})],
                                width :{ size: 30 ,type: WidthType.PERCENTAGE },
                                shading: shadingObj,
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"졸업일자", alignment: AlignmentType.CENTER,})],
                                width :{ size: 20 ,type: WidthType.PERCENTAGE },
                                shading: shadingObj,
                            }),
                        ],
                    }),
        )
        //두번째이후 반복 TR
        //json 데이터에서부터 배열에 있는 정보를 담을 반복된 ROW를 생성합니다.
        for (let i=0;i<rows_education_data.data.length;i++){
            rows_education.push(
                new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({text:rows_education_data.data[i].deName, alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:rows_education_data.data[i].deGrade, alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:rows_education_data.data[i].deSubject, alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:rows_education_data.data[i].deGraduatedDate, alignment: AlignmentType.CENTER,})],
                            }),
                        ],
                    })
            )
        }

        //자격증 테이블
        //테이블 ROW들을 담을 배열을 생성합니다.
        let rows_certificate =[]
        //첫번쨰 TR
        rows_certificate.push(
            new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({text:"자격증명", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                width :{ size: 35 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"발급기관", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                width :{ size: 35 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"취득일자", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                width :{ size: 30 ,type: WidthType.PERCENTAGE }
                            }),
                        ],
                    }),
        )

        //두번째이후 반복 TR
        //json 데이터에서부터 배열에 있는 정보를 담을 반복된 ROW를 생성합니다.
        for (let i=0;i<rows_certificate_data.data.length;i++){
            rows_certificate.push(
                new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({text:rows_certificate_data.data[i].deName, alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:rows_certificate_data.data[i].deAgency, alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:rows_certificate_data.data[i].deDate, alignment: AlignmentType.CENTER,})],
                            }),
                        ],
                    })
            )
        }












        
        //경력사항 테이블
        //테이블 ROW들을 담을 배열을 생성합니다.
        let rows_career = []
        //첫번쨰 TR
        rows_career.push(
            new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({text:"회  사  명", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                width :{ size: 25 ,type: WidthType.PERCENTAGE }
                                
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"기  간", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                width :{ size: 25 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"직  위", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                width :{ size: 10 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"담당업무", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                width :{ size: 40 ,type: WidthType.PERCENTAGE }
                            }),
                        ],
                    })
        )

        //두번째이후 반복 TR
        //json 데이터에서부터 배열에 있는 정보를 담을 반복된 ROW를 생성합니다.
        for (let i=0;i<rows_career_data.data.length;i++){
            rows_career.push(
                new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({text:rows_career_data.data[i].deName, alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:rows_career_data.data[i].deDate, alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:rows_career_data.data[i].deGrade, alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:rows_career_data.data[i].deContents, alignment: AlignmentType.CENTER,})],
                            }),
                        ],
                    })
            )
        }
        //세번째 TR 블록( 학원 및 전문가과정 교육 )
        rows_career.push(

                    new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({text:"학원 및 전문가과정 교육", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                columnSpan:4
                            }),
                        ],
                    })
        )
        //네번째 반복 TR 블록
        
        for (let i=0;i<rows_training_data.data.length;i++){
            rows_career.push(
                new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({text:rows_training_data.data[i].deName, alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:rows_training_data.data[i].deDate, alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:rows_training_data.data[i].deContents, alignment: AlignmentType.CENTER,})],
                                columnSpan : 2
                            }),
                        ],
                    })
            )
        }

        //주요 프로젝트 경력 테이블
        //테이블 ROW들을 담을 배열을 생성합니다.
        let rows_project =[]
        //첫번째 TR
        rows_project.push(
            new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({text:"프로젝트명", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                rowSpan:2,
                                verticalAlign :VerticalAlign.CENTER,
                                width :{ size: 12.5 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"기  간", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                rowSpan:2,
                                verticalAlign :VerticalAlign.CENTER,
                                width :{ size: 17.5 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"발주처", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                rowSpan:2,
                                verticalAlign :VerticalAlign.CENTER,
                                width :{ size: 12.5 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"참여", alignment: AlignmentType.CENTER,}),new Paragraph({text:"범위", alignment: AlignmentType.CENTER,}) ],
                                shading: shadingObj,
                                rowSpan:2,
                                verticalAlign :VerticalAlign.CENTER,
                                width :{ size: 7.5 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"개발환경", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                columnSpan:4,
                                width :{ size: 50 ,type: WidthType.PERCENTAGE }
                            }),
                        ],
                    }),
        )
        //두번쨰 TR
        rows_project.push(
            new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({text:"H/W", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                verticalAlign :VerticalAlign.CENTER,
                                width :{ size: 12.5 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"언  어", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                verticalAlign :VerticalAlign.CENTER,
                                width :{ size: 12.5 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"DB", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                verticalAlign :VerticalAlign.CENTER,
                                width :{ size: 12.5 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"O/S", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                verticalAlign :VerticalAlign.CENTER,
                                width :{ size: 12.5 ,type: WidthType.PERCENTAGE }
                            }),
                        ],
                    }),
        )
        //세번째이후 반복 TR
        //json 데이터에서부터 배열에 있는 정보를 담을 반복된 ROW를 생성합니다.
        for (let i=0;i<rows_project_data.data.length;i++){
            rows_project.push(
                new TableRow({
                        children: [
                            new TableCell({
                                children: [new Paragraph({text:rows_project_data.data[i].deName, alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:rows_project_data.data[i].deDate, alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:rows_project_data.data[i].deOrder, alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:rows_project_data.data[i].deRole, alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:rows_project_data.data[i].deHardWare, alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:rows_project_data.data[i].deLanguage, alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:rows_project_data.data[i].deDataBase, alignment: AlignmentType.CENTER,})],
                            }),
                            new TableCell({
                                children: [new Paragraph({text:rows_project_data.data[i].deOperatingSystem, alignment: AlignmentType.CENTER,})],
                            }),
                        ],
                    })
            )
        }
        

        

        // 실제로 다운받을 MS-Word 파일 구조 정의 -----------------------------------------------------------------------------
        
        // DOCX 문서 객체를 생성하고 구조 및 데이터를 정의
        doc.addSection({
        //머릿말
        footers: {
            default: new Header({
                children: [new Paragraph(`오픈오브젝트 PMS에서 쓰여짐 (${nowDate})`)],
            }),
        },
        properties: {},
        //해당 문서의 구성들(자식-children이라고 표현)
          children: [
              //글자를 담는 Paragraph 객체 
          new Paragraph({
            alignment : AlignmentType.CENTER,
            children: [
            // 텍스트 한줄을 표현하는 TextRun 객체
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
          


          
          //인적사항 테이블 
          //테이블 객체 생성
          new Table({
                alignment: AlignmentType.CENTER,
                //TableRow(tr)를 정의
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
                                width :{ size: 20 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"기술등급", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                width :{ size: 20 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                                width :{ size: 20 ,type: WidthType.PERCENTAGE }
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
                                width :{ size: 50 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"생년월일", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                width :{ size: 20 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                                width :{ size: 20 ,type: WidthType.PERCENTAGE }
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
                                width :{ size: 20 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"직  위", alignment: AlignmentType.CENTER,})],
                                shading: shadingObj,
                                width :{ size: 20 ,type: WidthType.PERCENTAGE }
                            }),
                            new TableCell({
                                children: [new Paragraph({text:"", alignment: AlignmentType.CENTER,})],
                                width :{ size: 20 ,type: WidthType.PERCENTAGE }
                            }),
                        ],
                    }),




                ],
                width :{ size: 100 ,type: WidthType.PERCENTAGE }
            }),
            


            new Paragraph({
            children: [
            new TextRun({
              text: '학력사항',
              bold: true,
              size: 25
            }),
            ],
          }),
            //학력사항 테이블
            new Table({
                alignment: AlignmentType.CENTER,
                rows: rows_education,  
                width :{ size: 100 ,type: WidthType.PERCENTAGE }
            }),



            new Paragraph({
            children: [
            new TextRun({
              text: '자격증',
              bold: true,
              size: 25
            }),
            ],
          }),
            //자격증 테이블 
            new Table({
                alignment: AlignmentType.CENTER,
                rows: rows_certificate,
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

            //경력사항 테이블 
            new Table({
                alignment: AlignmentType.CENTER,
                rows: rows_career,    //회사명 기간 직위 담당 업무 라인 
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

            //주요 프로젝트 경력 테이블
            new Table({
                alignment: AlignmentType.CENTER,
                rows: rows_project,
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
        this.saveDocumentToFile(doc, `개발이력카드 ${pmsName} (${nowDate}에 작성됨).docx`);
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

