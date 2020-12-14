/*
hold a template model of the data structure we use for every user/org, so we can access those parts conveniently
*/
module.exports = function(db) {
  let datasetModel = {
    careerPaths: [
      "Big-Mid Firm/Organization/Agency",
      "Solo/Small Firm/Organization/Agency",
      "Appellate/Judicial Clerk",
      "InHouse Counsel",
      "Legal Operations/Entrepreneur"
    ],

    groups: [
      {
        label: "Process",
        scriptname: "process",
        description: "Delivering legal services efficiently and effectively",
        ability: "deliver legal services efficiently and effectively",
        competencies: [
          {
            label: "Technology Fluency",
            description:
              "Leverage technology competently and to increase value (efficiency and/or efficacy)",
            selected: true,
            hasGap: false,
            score: 5,
            careerPathAlignment: {
              "Big-Mid Firm/Organization/Agency": {
                idealScore: 4,
                myScore: 5,
                visibleForThisCareerPath: true
              },
              "Solo/Small Firm/Organization/Agency": {
                idealScore: 10,
                myScore: 5,
                visibleForThisCareerPath: true
              },
              "Appellate/Judicial Clerk": {
                idealScore: 3,
                myScore: 5,
                visibleForThisCareerPath: true
              },
              "InHouse Counsel": {
                idealScore: 8,
                myScore: 5,
                visibleForThisCareerPath: true
              },
              "Legal Operations/Entrepreneur": {
                idealScore: 10,
                myScore: 5,
                visibleForThisCareerPath: true
              }
            },
            playlist: [
              "Practicum: Corporate Counsel",
              "Negotiation",
              "Passport to Practice (virtual bootcamp for law students + lawyers)",
              "Basics of Contract Drafting",
              "Artificial Intelligence and Legal Reasoning",
              "Innovation Theory & Intellectual Property",
              "Advanced Legal Writing: Writing for the Court",
              "Advanced Legal Writing: Argument, Advocacy, Drafting",
              "Advanced Legal Research",
              "Legal Technology",
              "Data Breach Notification",
              "Mediation and Advocacy",
              "Cybercrime"
            ]
          },
          {
            label: "Process Improvement, Design, & Selection",
            description:
              "Identify, improve, design the appropriate process for deal/dispute",
            selected: true,
            score: 5,
            hasGap: false,

            careerPathAlignment: {
              "Big-Mid Firm/Organization/Agency": {
                idealScore: 4,
                myScore: 5,
                visibleForThisCareerPath: true
              },
              "Solo/Small Firm/Organization/Agency": {
                idealScore: 10,
                myScore: 5,
                visibleForThisCareerPath: true
              },
              "Appellate/Judicial Clerk": {
                idealScore: 2,
                myScore: 5,
                visibleForThisCareerPath: true
              },
              "InHouse Counsel": {
                idealScore: 8,
                myScore: 5,
                visibleForThisCareerPath: true
              },
              "Legal Operations/Entrepreneur": {
                idealScore: 10,
                myScore: 5,
                visibleForThisCareerPath: true
              }
            },
            playlist: [
              "Artificial Intelligence and Legal Reasoning",
              "Innovation Theory & Intellectual Property",
              "Creating Change as a Lawyer",
              "Restorative Justice Seminar",
              "Human-centered design (TED Talk)",
              "Dispute Resolution in Sports",
              "Hello Design Thinking (IDEO, online course)",
              "Federal Jurisdiction",
              "Arbitration in the United States",
              "The Design of Everyday Things (book)",
              "Legal Problem Solving (website with list of human-centered design guides + toolkits)",
              "Design a Business (IDEO, online course)"
            ]
          },
          {
            label: "Project Management",
            description:
              "Lead and communicate with a team, create a process/schedule that minimizes risk and ensures completion, and adapt as necessary in a changing environment",
            selected: true,
            score: 5,
            hasGap: false,
            careerPathAlignment: {
              "Big-Mid Firm/Organization/Agency": {
                idealScore: 6,
                myScore: 5,
                visibleForThisCareerPath: true
              },
              "Solo/Small Firm/Organization/Agency": {
                idealScore: 10,
                myScore: 5,
                visibleForThisCareerPath: true
              },
              "Appellate/Judicial Clerk": {
                idealScore: 3,
                myScore: 5,
                visibleForThisCareerPath: true
              },
              "InHouse Counsel": {
                idealScore: 10,
                myScore: 5,
                visibleForThisCareerPath: true
              },
              "Legal Operations/Entrepreneur": {
                idealScore: 10,
                myScore: 5,
                visibleForThisCareerPath: true
              }
            },
            playlist: [
              "Practicum: Corporate Counsel",
              "Business Strategy (Law)"
            ]
          },
          {
            label: "Data Analysis",
            description:
              "Understand and analyze data and an ability to work with spreadsheets",
            selected: true,
            score: 5,
            hasGap: false,
            careerPathAlignment: {
              "Big-Mid Firm/Organization/Agency": {
                idealScore: 4,
                myScore: 5,
                visibleForThisCareerPath: true
              },
              "Solo/Small Firm/Organization/Agency": {
                idealScore: 10,
                myScore: 5,
                visibleForThisCareerPath: true
              },
              "Appellate/Judicial Clerk": {
                idealScore: 4,
                myScore: 5,
                visibleForThisCareerPath: true
              },
              "InHouse Counsel": {
                idealScore: 8,
                myScore: 5,
                visibleForThisCareerPath: true
              },
              "Legal Operations/Entrepreneur": {
                idealScore: 10,
                myScore: 5,
                visibleForThisCareerPath: true
              }
            },

            playlist: [
              "Practicum: Corporate Counsel",
              "Negotation",
              "Passport to Practice (virtual bootcamp for law students + lawyers)",
              "Data Breach Notification",
              "Mediation and Advocacy",
              "Clinic: International Human Rights Advocacy",
              "Clinic Practice: Complex Civil Litigation & Investor Protection",
              "Clinic Practice: Environmental Advocacy",
              "Business Strategy (Law)",
              "Tax Accounting Seminar",
              "Quantitative Reasoning in the Law",
              "Economic Analysis of Corp. Securities Law",
              "Colloquium: International Human Rights",
              "Business Analytics",
              "The Power of Experiments: Decision-Making in a Data-Driven World (book)",
              "The beauty of data visualization (TED Talk)",
              "Introduction to Data Analytics for Business + Advanced Business Analytics for Business (University of Colorado at Boulder via Coursera, online course)",
              "Finance for Nonfinance Professionals (Rice University via Coursera, online course)",
              "Data Science Cheatsheet (PDF)",
              "Data Analytics Boot Camp (Vanderbilt University, online course)",
              "Data Analysis and Presentation Skills: the PwC Approach (PwC via Coursera, online course)",
              "Accounting for Decision-Making (Law)",
              "3 ways to spot a bad statistic (TED Talk)"
            ]
          }
        ]
      },
      {
        label: "Practice",
        scriptname: "practice",
        description: "Knowing, researching, and clearly communicating the law",
        ability: "know, research, and clearly communicate the law",

        competencies: [
          {
            label: "Issue Spotting",
            description:
              "Identify relevant facts, legal issues, and informational gaps or discrepancies",
            selected: true,
            score: 5,
            hasGap: false,
            careerPathAlignment: {
              "Big-Mid Firm/Organization/Agency": {
                idealScore: 10,
                myScore: 5,
                visibleForThisCareerPath: true
              },
              "Solo/Small Firm/Organization/Agency": {
                idealScore: 10,
                myScore: 5,
                visibleForThisCareerPath: true
              },
              "Appellate/Judicial Clerk": {
                idealScore: 10,
                myScore: 5,
                visibleForThisCareerPath: true
              },
              "InHouse Counsel": {
                idealScore: 8,
                visibleForThisCareerPath: true
              },
              "Legal Operations/Entrepreneur": {
                idealScore: 5,
                myScore: 5,

                visibleForThisCareerPath: true
              }
            },

            playlist: [
              "Practicum: Corporate Counsel",
              "Negotation",
              "Data Breach Notification",
              "Clinic: International Human Rights Advocacy",
              "Clinic Practice: Complex Civil Litigation & Investor Protection",
              "Clinic Practice: Environmental Advocacy",
              "Tax Accounting Seminar",
              "Economic Analysis of Corp. Securities Law",
              "Colloquium: International Human Rights",
              "Business Analytics",
              "Federal Jurisdiction",
              "Arbitration in the United States",
              "Advanced Legal Research",
              "Cybercrime",
              "Law, Advocacy & Public Persuasion",
              "Practicum: Public Interest Law",
              "Practicum: Criminal Law",
              "Practicum: Civil Government",
              "Clnic: Second Chances: Advocacy for Children in Juvenile & Criminal Court",
              "Clinic: Entrepreneurship Law Center",
              "Clinic: Community Justice and Civil Rights Litigation",
              "Clinic: Civl Rights Litigation",
              "Clinic Practice: Immigration Law",
              "Clinic Practice: Eviction Defense and Unemployment Compensation Clinic",
              "Clinic Practice: Children's Rights Advocacy: International and Domestic",
              "Clinic Practice: Center on Wrongful Convictions",
              "Clinic Juvenile Justice Pre-Trial, Trial, Appeal and Post-Dispositional/Post-Conviction Advocacy",
              "Legal Ethics for Public Interest and Government Lawyers",
              "Legal Ethics for Business Lawyers",
              "Free Speech on Campus",
              "Criminal Trial Practice",
              "Communication and Legal Reasoning I",
              "Clinic Practice: The United States Supreme Court",
              "Violence Reduction & Transformational Change in Justice Systems",
              "Legal Ethics",
              "International HR Law: Differing Perspectives, Europe, the Americas, US",
              "Intellectual Property Litigation: Pretrial Skills",
              "Entrerpreneurship Law",
              "Anti-Discrimination Law",
              "White Collar Criminal Practice",
              "Tax Research",
              "Refugees and Asylum",
              "Prison and Prisoners' Rights",
              "Contact Tracing, Law and Ethics",
              "US Companies in Foreign Markets",
              "United States Transfer Pricing",
              "Torts",
              "The Derivatives Markets and Legal Practice",
              "Taxation of Property Transactions",
              "Tax Treaties",
              "Tax Procedure",
              "Structuring Transactions: Music Law",
              "State and Local Taxation",
              "Securities Regulation",
              "S Corporations and Other Specially Taxed Entities",
              "Property",
              "Patent Law",
              "Partnership Tax (LLM Tax)",
              "Natural Resources",
              "Mergers and Acquisitions",
              "Legislation",
              "Jurisprudence: Foundational Questions of Law and Lawyering",
              "Investment Banking",
              "International Taxation",
              "International Human Rights Law",
              "Intellectual Property",
              "Income Taxation of Trusts and Estates",
              "Immigration Law",
              "History of Economic Regulation",
              "Evidence",
              "Estates and Trusts",
              "Estate and Gift Tax",
              "Employment Law",
              "Election Law",
              "Cross-Border Transactions",
              "Criminal Law",
              "Corporate Restructuring: Bankruptcy Reorganizations",
              "Contracts",
              "Contemporary Problems in Complex Litigation",
              "Consitutional Criminal Procedure",
              "Commercial Law: Securerd Transactions",
              "Civil Procedure II",
              "Civil Procedure",
              "Business Associations",
              "Basic Federal Income Taxation",
              "Bankruptcy",
              "Antitrust Law",
              "Advanced Federal Jurisdiction"
            ]
          },
          {
            label: "Case Framing",
            description:
              "Frame a case, analysis, policy, or project compellingly",
            selected: true,
            score: 5,
            hasGap: false,
            careerPathAlignment: {
              "Big-Mid Firm/Organization/Agency": {
                idealScore: 10,
                myScore: 5,

                visibleForThisCareerPath: true
              },
              "Solo/Small Firm/Organization/Agency": {
                idealScore: 10,
                myScore: 5,

                visibleForThisCareerPath: true
              },
              "Appellate/Judicial Clerk": {
                idealScore: 10,
                myScore: 5,

                visibleForThisCareerPath: true
              },
              "InHouse Counsel": {
                idealScore: 8,
                myScore: 5,

                visibleForThisCareerPath: true
              },
              "Legal Operations/Entrepreneur": {
                idealScore: 3,
                myScore: 5,

                visibleForThisCareerPath: true
              }
            },

            playlist: [
              "Practicum: Corporate Counsel",
              "Negotation",
              "Clinic: International Human Rights Advocacy",
              "Clinic Practice: Complex Civil Litigation & Investor Protection",
              "Clinic Practice: Environmental Advocacy",
              "Advanced Legal Research",
              "Law, Advocacy & Public Persuasion",
              "Practicum: Public Interest Law",
              "Practicum: Criminal Law",
              "Practicum: Civil Government",
              "Clnic: Second Chances: Advocacy for Children in Juvenile & Criminal Court",
              "Clinic: Entrepreneurship Law Center",
              "Clinic: Community Justice and Civil Rights Litigation",
              "Clinic: Civl Rights Litigation",
              "Clinic Practice: Immigration Law",
              "Clinic Practice: Eviction Defense and Unemployment Compensation Clinic",
              "Clinic Practice: Children's Rights Advocacy: International and Domestic",
              "Clinic Practice: Center on Wrongful Convictions",
              "Clinic Juvenile Justice Pre-Trial, Trial, Appeal and Post-Dispositional/Post-Conviction Advocacy",
              "Criminal Trial Practice",
              "Communication and Legal Reasoning I",
              "Clinic Practice: The United States Supreme Court",
              "Intellectual Property Litigation: Pretrial Skills",
              "Entrerpreneurship Law",
              "Anti-Discrimination Law",
              "Tax Research",
              "Contact Tracing, Law and Ethics",
              "Dispute Resolution in Sports",
              "Basics of Contract Drafting",
              "Advanced Legal Writing: Writing for the Court",
              "Advanced Legal Writing: Argument, Advocacy, Drafting",
              "Practicum: Judicial"
            ]
          },
          {
            label: "Case Analysis",
            description: "Assess the soundness of a potential deal or solution",
            selected: true,
            score: 5,
            hasGap: false,
            careerPathAlignment: {
              "Big-Mid Firm/Organization/Agency": {
                idealScore: 10,
                myScore: 5,

                visibleForThisCareerPath: true
              },
              "Solo/Small Firm/Organization/Agency": {
                idealScore: 10,
                myScore: 5,

                visibleForThisCareerPath: true
              },
              "Appellate/Judicial Clerk": {
                idealScore: 10,
                myScore: 5,

                visibleForThisCareerPath: true
              },
              "InHouse Counsel": {
                idealScore: 8,
                myScore: 5,

                visibleForThisCareerPath: true
              },
              "Legal Operations/Entrepreneur": {
                idealScore: 3,
                myScore: 5,

                visibleForThisCareerPath: true
              }
            },

            playlist: [
              "Practicum: Corporate Counsel",
              "Clinic: International Human Rights Advocacy",
              "Clinic Practice: Complex Civil Litigation & Investor Protection",
              "Clinic Practice: Environmental Advocacy",
              "Advanced Legal Research",
              "Law, Advocacy & Public Persuasion",
              "Practicum: Public Interest Law",
              "Practicum: Criminal Law",
              "Practicum: Civil Government",
              "Clnic: Second Chances: Advocacy for Children in Juvenile & Criminal Court",
              "Clinic: Entrepreneurship Law Center",
              "Clinic: Community Justice and Civil Rights Litigation",
              "Clinic: Civl Rights Litigation",
              "Clinic Practice: Immigration Law",
              "Clinic Practice: Eviction Defense and Unemployment Compensation Clinic",
              "Clinic Practice: Children's Rights Advocacy: International and Domestic",
              "Clinic Practice: Center on Wrongful Convictions",
              "Clinic Juvenile Justice Pre-Trial, Trial, Appeal and Post-Dispositional/Post-Conviction Advocacy",
              "Criminal Trial Practice",
              "Communication and Legal Reasoning I",
              "Clinic Practice: The United States Supreme Court",
              "Intellectual Property Litigation: Pretrial Skills",
              "Entrerpreneurship Law",
              "Anti-Discrimination Law",
              "Tax Research",
              "Contact Tracing, Law and Ethics",
              "Dispute Resolution in Sports",
              "Basics of Contract Drafting",
              "Advanced Legal Writing: Writing for the Court",
              "Advanced Legal Writing: Argument, Advocacy, Drafting",
              "Practicum: Judicial",
              "Data Breach Notification",
              "Tax Accounting Seminar",
              "Economic Analysis of Corp. Securities Law",
              "Colloquium: International Human Rights",
              "Business Analytics",
              "Federal Jurisdiction",
              "Arbitration in the United States",
              "Cybercrime",
              "Legal Ethics for Public Interest and Government Lawyers",
              "Legal Ethics for Business Lawyers",
              "Free Speech on Campus",
              "Violence Reduction & Transformational Change in Justice Systems",
              "Legal Ethics",
              "International HR Law: Differing Perspectives, Europe, the Americas, US",
              "White Collar Criminal Practice",
              "Refugees and Asylum",
              "Prison and Prisoners' Rights",
              "US Companies in Foreign Markets",
              "United States Transfer Pricing",
              "Torts",
              "The Derivatives Markets and Legal Practice",
              "Taxation of Property Transactions",
              "Tax Treaties",
              "Tax Procedure",
              "Structuring Transactions: Music Law",
              "State and Local Taxation",
              "Securities Regulation",
              "S Corporations and Other Specially Taxed Entities",
              "Property",
              "Patent Law",
              "Partnership Tax (LLM Tax)",
              "Natural Resources",
              "Mergers and Acquisitions",
              "Legislation",
              "Jurisprudence: Foundational Questions of Law and Lawyering",
              "Investment Banking",
              "International Taxation",
              "International Human Rights Law",
              "Intellectual Property",
              "Income Taxation of Trusts and Estates",
              "Immigration Law",
              "History of Economic Regulation",
              "Evidence",
              "Estates and Trusts",
              "Estate and Gift Tax",
              "Employment Law",
              "Election Law",
              "Cross-Border Transactions",
              "Criminal Law",
              "Corporate Restructuring: Bankruptcy Reorganizations",
              "Contracts",
              "Contemporary Problems in Complex Litigation",
              "Consitutional Criminal Procedure",
              "Commercial Law: Securerd Transactions",
              "Civil Procedure II",
              "Civil Procedure",
              "Business Associations",
              "Basic Federal Income Taxation",
              "Bankruptcy",
              "Antitrust Law",
              "Advanced Federal Jurisdiction",
              "Artificial Intelligence and Legal Reasoning"
            ]
          },
          {
            label: "Drafting",
            description: "Draft pleadings, motions, and briefs    ",
            selected: true,
            score: 5,
            hasGap: false,
            careerPathAlignment: {
              "Big-Mid Firm/Organization/Agency": {
                idealScore: 10,
                myScore: 5,

                visibleForThisCareerPath: true
              },
              "Solo/Small Firm/Organization/Agency": {
                idealScore: 10,
                myScore: 5,

                visibleForThisCareerPath: true
              },
              "Appellate/Judicial Clerk": {
                idealScore: 10,
                myScore: 5,

                visibleForThisCareerPath: true
              },
              "InHouse Counsel": {
                idealScore: 10,
                myScore: 5,

                visibleForThisCareerPath: true
              },
              "Legal Operations/Entrepreneur": {
                idealScore: 10,
                myScore: 5,

                visibleForThisCareerPath: true
              }
            },

            playlist: [
              "Practicum: Corporate Counsel",
              "Clinic: International Human Rights Advocacy",
              "Clinic Practice: Complex Civil Litigation & Investor Protection",
              "Clinic Practice: Environmental Advocacy",
              "Advanced Legal Research",
              "Law, Advocacy & Public Persuasion",
              "Practicum: Public Interest Law",
              "Practicum: Criminal Law",
              "Practicum: Civil Government",
              "Clnic: Second Chances: Advocacy for Children in Juvenile & Criminal Court",
              "Clinic: Entrepreneurship Law Center",
              "Clinic: Community Justice and Civil Rights Litigation",
              "Clinic: Civl Rights Litigation",
              "Clinic Practice: Immigration Law",
              "Clinic Practice: Eviction Defense and Unemployment Compensation Clinic",
              "Clinic Practice: Children's Rights Advocacy: International and Domestic",
              "Clinic Practice: Center on Wrongful Convictions",
              "Clinic Juvenile Justice Pre-Trial, Trial, Appeal and Post-Dispositional/Post-Conviction Advocacy",
              "Communication and Legal Reasoning I",
              "Clinic Practice: The United States Supreme Court",
              "Intellectual Property Litigation: Pretrial Skills",
              "Dispute Resolution in Sports",
              "Basics of Contract Drafting",
              "Advanced Legal Writing: Writing for the Court",
              "Advanced Legal Writing"
            ]
          }
        ]
      },
      {
        label: "The People",
        scriptname: "people",
        description:
          "Understanding and relating to clients, colleagues, and ourselves",
        ability: "understand and relate to clients, colleagues, and themselves",

        competencies: [
          {
            label: "Emotional Intelligence",
            description:
              "Able to pick up subtle cues/Relate to and understand others",
            selected: true,
            score: 5,
            hasGap: false,
            careerPathAlignment: {
              "Big-Mid Firm/Organization/Agency": {
                idealScore: 10,
                myScore: 5,

                visibleForThisCareerPath: true
              },
              "Solo/Small Firm/Organization/Agency": {
                idealScore: 10,
                myScore: 5,

                visibleForThisCareerPath: true
              },
              "Appellate/Judicial Clerk": {
                idealScore: 2,
                myScore: 5,

                visibleForThisCareerPath: true
              },
              "InHouse Counsel": {
                idealScore: 10,
                myScore: 5,

                visibleForThisCareerPath: true
              },
              "Legal Operations/Entrepreneur": {
                idealScore: 10,
                myScore: 5,

                visibleForThisCareerPath: true
              }
            },
            playlist: [
              "Clinic: International Human Rights Advocacy",
              "Clinic Practice: Complex Civil Litigation & Investor Protection",
              "Law, Advocacy & Public Persuasion",
              "Practicum: Public Interest Law",
              "Practicum: Criminal Law",
              "Practicum: Civil Government",
              "Clnic: Second Chances: Advocacy for Children in Juvenile & Criminal Court",
              "Clinic: Entrepreneurship Law Center",
              "Clinic: Community Justice and Civil Rights Litigation",
              "Clinic: Civl Rights Litigation",
              "Clinic Practice: Immigration Law",
              "Clinic Practice: Eviction Defense and Unemployment Compensation Clinic",
              "Clinic Practice: Children's Rights Advocacy: International and Domestic",
              "Clinic Practice: Center on Wrongful Convictions",
              "Clinic Juvenile Justice Pre-Trial, Trial, Appeal and Post-Dispositional/Post-Conviction Advocacy",
              "Criminal Trial Practice",
              "Anti-Discrimination Law",
              "Legal Ethics for Public Interest and Government Lawyers",
              "Free Speech on Campus",
              "Violence Reduction & Transformational Change in Justice Systems",
              "Legal Ethics",
              "International HR Law: Differing Perspectives, Europe, the Americas, US",
              "White Collar Criminal Practice",
              "Refugees and Asylum",
              "Prison and Prisoners' Rights",
              "Negotation",
              "Passport to Practice (virtual bootcamp for law students + lawyers)",
              "Creating Change as a Lawyer",
              "Restorative Justice Seminar",
              "Human-centered design (TED Talk)",
              "Hello Design Thinking (IDEO, online course)",
              "Switch: How to Change Things When Change Is Hard (Book)",
              "Mastering Collaboration: Make Working Together Less Painful and More Productive (book)",
              "HBR's 10 Must-Reads on Collaboration (collection of articles)",
              "Don't fail fast — fail mindfully (TED Talk)",
              "Worklife with Adam Grant (podcast)",
              "VIA Character Strengths Survey (assessment)",
              "The gift and power of emotional courage (TED Talk)",
              "Soft Skills for the Effective Lawyer (book)",
              "Reinforcements: How to Get People to Help You (book)",
              "Process feedback with a strainer, not a sponge (TED Talk)",
              "No One Understands You (and what to do about it) (book)",
              "Insight: the surprising truth about how others see us, how we see ourselves, and why the answers matter more than we think (book)",
              "Increase your self-awareness with one simple fix (TED Talk)",
              "Impactful Presentations (IDEO, online course)",
              "How to disagree productively and find common ground (TED Talk)",
              "How to ask for help — and get a yes (TED Talk)",
              "How miscommunication happens (and how to avoid it) (TED Talk)",
              "HBR's 10 Must-Reads on Communication (collection of articles)",
              "HBR Guide to Persuasive Presentations (book)",
              "Foundations of Positive Psychology Specialization (University of Pennsylvania via Coursera, online course)",
              "Fierce Conversations: achieving success at work and in life one conversation at a time (book)",
              "Emotional Intelligence: Why It Can Matter More than IQ (book)",
              "Emotional Intelligence (EI) Assessments via Daniel Goleman (assessments)",
              "Emotional Agility (book)",
              "Disrupt Yourself Podcast with Whitney Johnson (podcast)",
              "10 Ways to Have a Better Conversation (TED Talk)",
              "Lawyer Memoirs"
            ]
          },
          {
            label: "Entrepreneurial Mindset",
            description:
              "Think outside the box, creatively, and proactively, not afraid to try something different",
            selected: true,
            score: 5,
            hasGap: false,
            careerPathAlignment: {
              "Big-Mid Firm/Organization/Agency": {
                idealScore: 10,
                myScore: 5,

                visibleForThisCareerPath: true
              },
              "Solo/Small Firm/Organization/Agency": {
                idealScore: 10,
                myScore: 5,

                visibleForThisCareerPath: true
              },
              "Appellate/Judicial Clerk": {
                idealScore: 3,
                myScore: 5,

                visibleForThisCareerPath: true
              },
              "InHouse Counsel": {
                idealScore: 10,
                myScore: 5,

                visibleForThisCareerPath: true
              },
              "Legal Operations/Entrepreneur": {
                idealScore: 10,
                myScore: 5,

                visibleForThisCareerPath: true
              }
            },

            playlist: [
              "Law, Advocacy & Public Persuasion",
              "Clinic: Entrepreneurship Law Center",
              "Legal Ethics for Public Interest and Government Lawyers",
              "Negotation",
              "Passport to Practice (virtual bootcamp for law students + lawyers)",
              "Creating Change as a Lawyer",
              "Human-centered design (TED Talk)",
              "Switch: How to Change Things When Change Is Hard (Book)",
              "Don't fail fast — fail mindfully (TED Talk)",
              "Practicum: Corporate Counsel",
              "Basics of Contract Drafting",
              "Entrerpreneurship Law",
              "Legal Ethics for Business Lawyers",
              "Artificial Intelligence and Legal Reasoning",
              "Business Strategy (Law)",
              "Innovation Theory & Intellectual Property",
              "Legal Technology"
            ]
          },
          {
            label: "Self-Regulation",
            description: "Exhibit emotional regulation & self-control",
            selected: true,
            score: 5,
            hasGap: false,
            careerPathAlignment: {
              "Big-Mid Firm/Organization/Agency": {
                idealScore: 10,
                myScore: 5,

                visibleForThisCareerPath: true
              },
              "Solo/Small Firm/Organization/Agency": {
                idealScore: 10,
                myScore: 5,

                visibleForThisCareerPath: true
              },
              "Appellate/Judicial Clerk": {
                idealScore: 2,
                myScore: 5,

                visibleForThisCareerPath: true
              },
              "InHouse Counsel": {
                idealScore: 10,
                myScore: 5,

                visibleForThisCareerPath: true
              },
              "Legal Operations/Entrepreneur": {
                idealScore: 10,
                myScore: 5,

                visibleForThisCareerPath: true
              }
            },
            playlist: [
              "Law, Advocacy & Public Persuasion",
              "Legal Ethics for Public Interest and Government Lawyers",
              "Negotation",
              "Passport to Practice (virtual bootcamp for law students + lawyers)",
              "Creating Change as a Lawyer",
              "Switch: How to Change Things When Change Is Hard (Book)",
              "Don't fail fast — fail mindfully (TED Talk)",
              "Legal Ethics for Business Lawyers",
              "Clinic: International Human Rights Advocacy",
              "Clinic Practice: Complex Civil Litigation & Investor Protection",
              "Practicum: Public Interest Law",
              "Practicum: Criminal Law",
              "Practicum: Civil Government",
              "Clnic: Second Chances: Advocacy for Children in Juvenile & Criminal Court",
              "Clinic: Community Justice and Civil Rights Litigation",
              "Clinic: Civl Rights Litigation",
              "Clinic Practice: Immigration Law",
              "Clinic Practice: Eviction Defense and Unemployment Compensation Clinic",
              "Clinic Practice: Children's Rights Advocacy: International and Domestic",
              "Clinic Practice: Center on Wrongful Convictions",
              "Clinic Juvenile Justice Pre-Trial, Trial, Appeal and Post-Dispositional/Post-Conviction Advocacy",
              "Free Speech on Campus",
              "Restorative Justice Seminar",
              "Hello Design Thinking (IDEO, online course)",
              "Mastering Collaboration: Make Working Together Less Painful and More Productive (book)",
              "HBR's 10 Must-Reads on Collaboration (collection of articles)",
              "Worklife with Adam Grant (podcast)",
              "VIA Character Strengths Survey (assessment)",
              "The gift and power of emotional courage (TED Talk)",
              "Soft Skills for the Effective Lawyer (book)",
              "Reinforcements: How to Get People to Help You (book)",
              "Process feedback with a strainer, not a sponge (TED Talk)",
              "No One Understands You (and what to do about it) (book)",
              "Insight: the surprising truth about how others see us, how we see ourselves, and why the answers matter more than we think (book)",
              "Increase your self-awareness with one simple fix (TED Talk)",
              "Impactful Presentations (IDEO, online course)",
              "How to disagree productively and find common ground (TED Talk)",
              "How to ask for help — and get a yes (TED Talk)",
              "How miscommunication happens (and how to avoid it) (TED Talk)",
              "HBR's 10 Must-Reads on Communication (collection of articles)",
              "HBR Guide to Persuasive Presentations (book)",
              "Foundations of Positive Psychology Specialization (University of Pennsylvania via Coursera, online course)",
              "Fierce Conversations: achieving success at work and in life one conversation at a time (book)",
              "Emotional Intelligence: Why It Can Matter More than IQ (book)",
              "Emotional Intelligence (EI) Assessments via Daniel Goleman (assessments)",
              "Emotional Agility (book)",
              "Disrupt Yourself Podcast with Whitney Johnson (podcast)",
              "10 Ways to Have a Better Conversation (TED Talk)"
            ]
          },
          {
            label: "Problem-Solving",
            description:
              "Perceive challenges as opportunities and regularly generate movement towards resolution instead of setting up more obstacles",
            selected: true,
            score: 5,
            hasGap: false,
            careerPathAlignment: {
              "Big-Mid Firm/Organization/Agency": {
                idealScore: 10,
                myScore: 5,
                visibleForThisCareerPath: true
              },
              "Solo/Small Firm/Organization/Agency": {
                idealScore: 10,
                myScore: 5,
                visibleForThisCareerPath: true
              },
              "Appellate/Judicial Clerk": {
                idealScore: 3,
                myScore: 5,
                visibleForThisCareerPath: true
              },
              "InHouse Counsel": {
                idealScore: 10,
                myScore: 5,
                visibleForThisCareerPath: true
              },
              "Legal Operations/Entrepreneur": {
                idealScore: 10,
                myScore: 5,
                visibleForThisCareerPath: true
              }
            },
            playlist: [
              "Law, Advocacy & Public Persuasion",
              "Legal Ethics for Public Interest and Government Lawyers",
              "Negotation",
              "Passport to Practice (virtual bootcamp for law students + lawyers)",
              "Creating Change as a Lawyer",
              "Legal Ethics for Business Lawyers",
              "Clinic: International Human Rights Advocacy",
              "Clinic Practice: Complex Civil Litigation & Investor Protection",
              "Practicum: Public Interest Law",
              "Practicum: Criminal Law",
              "Practicum: Civil Government",
              "Clnic: Second Chances: Advocacy for Children in Juvenile & Criminal Court",
              "Clinic: Community Justice and Civil Rights Litigation",
              "Clinic: Civl Rights Litigation",
              "Clinic Practice: Immigration Law",
              "Clinic Practice: Eviction Defense and Unemployment Compensation Clinic",
              "Clinic Practice: Children's Rights Advocacy: International and Domestic",
              "Clinic Practice: Center on Wrongful Convictions",
              "Clinic Juvenile Justice Pre-Trial, Trial, Appeal and Post-Dispositional/Post-Conviction Advocacy",
              "Free Speech on Campus",
              "Restorative Justice Seminar",
              "Mastering Collaboration: Make Working Together Less Painful and More Productive (book)",
              "HBR's 10 Must-Reads on Collaboration (collection of articles)",
              "Clinic: Entrepreneurship Law Center",
              "Human-centered design (TED Talk)",
              "Practicum: Corporate Counsel",
              "Basics of Contract Drafting",
              "Artificial Intelligence and Legal Reasoning",
              "Innovation Theory & Intellectual Property",
              "Legal Technology",
              "Criminal Trial Practice",
              "Violence Reduction & Transformational Change in Justice Systems",
              "Legal Ethics",
              "International HR Law: Differing Perspectives, Europe, the Americas, US",
              "Clinic Practice: Environmental Advocacy",
              "Communication and Legal Reasoning I",
              "Clinic Practice: The United States Supreme Court",
              "Quantitative Reasoning in the Law"
            ]
          }
        ]
      }
    ]
  };

  return datasetModel;
};
