import { getNotificationContent } from "@/components/notifications/notificationContent"

const notification = (children: object[], markDefs: object[] = []) =>
  ({
    _type: "notification",
    notification_text: [
      { _key: "a", _type: "block", style: "normal", markDefs, children },
    ],
  } as any)

describe("getNotificationContent", () => {
  it("returns null without text", () => {
    expect(getNotificationContent(undefined)).toBeNull()
    expect(getNotificationContent({ _type: "notification" } as any)).toBeNull()
  })

  it("flattens the text and takes the first link", () => {
    const result = getNotificationContent(
      notification(
        [
          { _key: "1", _type: "span", marks: ["l1"], text: "Read" },
          { _key: "2", _type: "span", marks: [], text: " my lab  notes from " },
          { _key: "3", _type: "span", marks: ["l2"], text: "Middlesex" },
        ],
        [
          { _key: "l1", _type: "link", href: "https://example.com/notes" },
          { _key: "l2", _type: "link", href: "https://example.com/mdx" },
        ]
      )
    )

    expect(result).toEqual({
      message: "Read my lab notes from Middlesex",
      href: "https://example.com/notes",
      isExternal: true,
    })
  })

  it("treats relative links as internal and allows no link", () => {
    expect(
      getNotificationContent(
        notification(
          [{ _key: "1", _type: "span", marks: ["l"], text: "Hi" }],
          [{ _key: "l", _type: "link", href: "/blog/post" }]
        )
      )
    ).toMatchObject({ href: "/blog/post", isExternal: false })

    expect(
      getNotificationContent(
        notification([{ _key: "1", _type: "span", marks: [], text: "Hi" }])
      )
    ).toMatchObject({ href: undefined, isExternal: false })
  })
})
