var schema = {
    type: "object",
    title: "Organization",
    headerTemplate: "{{self.name}}",
    properties: {
      name: {
        title: "Name",
        type: "string"
      },
      admin: {
        options: { hidden: true }
      },
      admin: {
        options: { hidden: true }
      },
      type: {
        options: { hidden: true }
      },
      foo: {
        options: { hidden: true }
      },
      structured: {
        options: { hidden: true }
      },
      _id: {
        options: { hidden: true }
      },
      _rev: {
        options: { hidden: true }
      },

      dataset: {
        title: "Org Data",
        type: "object",
        options: {
          collapsed: true
        },
        properties: {
          careerPaths: {
            title: "Career Paths",
            type: "array",
            options: {
              collapsed: true
            },
            items: {
              title: "Career Path",
              type: "string"
            }
          },
          groups: {
            title: "Competency Groups",
            type: "array",
            options: {
              collapsed: true
            },
            items: {
              type: "object",
              title: "Competency Group",
              headerTemplate: "{{ self.label }}",

              options: {
                collapsed: true
              },
              properties: {
                label: {
                  type: "string",
                  title: "Label", // this value should be added to the title of the parent object drop-down, so it's not just "Competency Group 1"
                  options: {}
                },
                ability: {
                  type: "string",
                  title: "Ability"
                },
                description: {
                  type: "string",
                  title: "Description"
                },
                scriptname: {
                  options: { hidden: true }
                },
                competencies: {
                  title: "Competencies",
                  type: "array",
                  items: {
                    title: "Compentency",
                    headerTemplate: "Compentency: {{ self.label }}",
                    type: "object",
                    properties: {
                      label: {
                        type: "string",
                        title: "Label"
                      },
                      description: {
                        type: "string",
                        title: "Description"
                      },
                      selected: {
                        options: { hidden: true }
                      },
                      hasGap: {
                        options: { hidden: true }
                      },
                      score: {
                        options: { hidden: true }
                      },

                      // hm, this object has dynamic keys, is that supported in json-editor? might need to turn this into an array...
                      careerPathAlignment: {
                        options: { hidden: true }
                      },
                      careerPathAlignmentArray: {
                        type: "array",
                        title: "Career Path Alignments",
                        items: {
                          title: "Alignment with Career Path",
                          headerTemplate: "{{self.label}}",
                          type: "object",
                          properties: {
                            label: {
                              title: "Label",
                              type: "string"
                            },
                            idealScore: {
                              title: "Ideal Score",
                              type: "integer"
                            },
                            myScore: {
                              options: {
                                hidden: true
                              }
                            },
                            visibleForThisCareerPath: {
                              type: "boolean",
                              title: "Show for this Career Path?"
                            }
                          }
                        }
                      },

                      playlist: {
                        title: "Gap Playlist",
                        type: "array",
                        format: "table",
                        options: {
                          collapsed: true
                        },
                        items: {
                          title: "Playlist Item",
                          type: "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    definitions: {
      name: {
        type: "string",
        minLength: 5
      }
    }
  };